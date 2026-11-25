import { cancel, confirm, intro, isCancel, outro } from "@clack/prompts";
import { logger } from "better-auth";
import { createAuthClient } from "better-auth/client";
import { deviceAuthorizationClient } from "better-auth/client/plugins";

import chalk from "chalk";
import { Command } from "commander";
import fs from "node:fs/promises";
import open from "open";
import os from "os";
import path from "path";
import yoctoSpinner from "yocto-spinner";

import * as z from "zod/v4";
import dotenv from "dotenv";
import { prisma } from "../../lib/prisma.js";
import { CLI_CLIENT_ID, SERVER_BASE_URL } from "../../constant/index.js";

dotenv.config();

/* ------------------------------------
types
------------------------------------*/

type LoginOptions = {
  serverUrl?: string;
  clientId?: string;
};

/* ------------------------------------
Auth client
------------------------------------*/

const authClient = createAuthClient({
  baseURL: SERVER_BASE_URL,
  plugins: [deviceAuthorizationClient()],
});

/* ------------------------------------
Actions
------------------------------------*/

export async function loginAction(opts: LoginOptions) {
  const options = z
    .object({
      serverUrl: z.string().optional(),
      clientId: z.string().optional(),
    })
    .parse(opts);

  const serverUrl = options.serverUrl ?? SERVER_BASE_URL;
  const clientId = options.clientId ?? CLI_CLIENT_ID;

  intro(chalk.bold("🔐Auth Cli Login"));

  // TODO: CHANGE THIS WITH TOKEN MANAGEMENT UTILS
  const existingToken = false;
  const expired = false;

  if (existingToken && !expired) {
    const shouldReAuth = await confirm({
      message: "You are already loggedIn. Do You want to login Again?",
      initialValue: false,
    });

    if (isCancel(shouldReAuth) || !shouldReAuth) {
      cancel("Login Cancelled");
      process.exit(0);
    }
  }

  const spinner = yoctoSpinner({ text: "Requesting device authorization..." });
  spinner.start();

  try {
    const { data, error } = await authClient.device.code({
      client_id: clientId,
      scope: "openid profile email",
    });

    spinner.stop();

    if (!data || error) {
      logger.error(
        `Could not start device authorization: ${error.error_description}`,
      );
      process.exit(1);
    }

    const {
      device_code,
      user_code,
      verification_uri,
      verification_uri_complete,
      interval = 5,
      expires_in,
    } = data;

    console.log(chalk.cyan("Device Authorization Required"));

    console.log(
      `Please visit" ${chalk.underline.blue(
        verification_uri || verification_uri_complete,
      )}`,
    );

    console.log(`Enter Code: ${chalk.bold.green(user_code)}`);

    const shouldOpen = await confirm({
      message: "Open browser automatically",
      initialValue: true,
    });

    if (!isCancel(shouldOpen) && shouldOpen) {
      const urlToOpen = verification_uri_complete || verification_uri;
      await open(urlToOpen);
    }

    console.log(
      chalk.gray(
        `Waiting for authorization (expires in ${Math.floor(
          expires_in / 60,
        )} minutes)...`,
      ),
    );


  } catch (error) {}
}

/* ------------------------------------
Commands Setup
------------------------------------*/

export const login = new Command("login")
  .description("Login to Better Auth")
  .option("--server-url <url>", "The Better Auth server URL", SERVER_BASE_URL)
  .option("--client-id <id>", "The OAuth client ID", CLI_CLIENT_ID)
  .action(loginAction);

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
import { prisma } from "../../lib/prisma";
import { CLI_CLIENT_ID, SERVER_BASE_URL, TOKEN_FILE } from "@/constant/index";
import { getStoredToken, isTokenExpired, storeToken } from "@/lib/token";

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

const pollForToken = async (
  authClient: any,
  deviceCode: string,
  clientId: string,
  initialIntervalue: number,
) => {
  let pollingInterval = initialIntervalue;

  const spinner = yoctoSpinner({ text: "", color: "cyan" });
  let dots = 0;

  return new Promise((resolve, reject) => {
    const poll = async () => {
      dots = (dots + 1) % 4;
      spinner.text = chalk.gray(
        `Polling for authorization${".".repeat(dots)}${" ".repeat(3 - dots)}`,
      );
      if (!spinner.isSpinning) spinner.start();

      try {
        const { data, error } = await authClient.device.token({
          grant_type: "urn:ietf:params:oauth:grant-type:device_code",
          device_code: deviceCode,
          client_id: clientId,
          fetchOptions: {
            headers: {
              "user-agent": `My CLI`,
            },
          },
        });

        if (data?.access_token) {
          console.log(
            chalk.bold.yellow(
              `Authorization successful!! Your access token: ${data.access_token}`,
            ),
          );

          spinner.stop();
          resolve(data);
          return;
        } else if (error) {
          switch (error.error) {
            case "authorization_pending":
              // Continue polling
              break;
            case "slow_down":
              pollingInterval += 5;
              break;
            case "access_denied":
              console.error("Access was denied by the user");
              return;
            case "expired_token":
              console.error("The device code has expired. Please try again.");
              return;
            default:
              spinner.stop();
              logger.error(`Error: ${error.error_description}`);
              process.exit(1);
          }
        }
      } catch (error) {
        spinner.stop();
        logger.error(`Network error: ${error}`);
        process.exit(1);
      }

      setTimeout(poll, pollingInterval * 1000);
    };

    setTimeout(poll, pollingInterval * 1000);
  });
};

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

  // Token Management during login:
  const existingToken = await getStoredToken();
  const expired = await isTokenExpired();

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

    const token = await pollForToken(
      authClient,
      device_code,
      clientId,
      interval,
    );

    if (token) {
      const saved = await storeToken(token);

      if (!saved) {
        console.log(
          chalk.yellow("\n⚠️  Warning: Could not save authentication token."),
        );
        console.log(chalk.yellow("You may need to login again on next use."));
      }

      // TODO: get the user data

      outro(chalk.green("Login successfull!"));
      console.log(chalk.gray(`\n Token saved to: ${TOKEN_FILE}`));
      console.log(
        chalk.gray("You can now use AI commands without logging in again.\n"),
      );
    }
  } catch (error) {
    spinner.stop();
    console.error(chalk.red("\nLogin failed:"), error);
    process.exit(1);
  }
}

/* ------------------------------------
Commands Setup
------------------------------------*/

export const login = new Command("login")
  .description("Login to Better Auth")
  .option("--server-url <url>", "The Better Auth server URL", SERVER_BASE_URL)
  .option("--client-id <id>", "The OAuth client ID", CLI_CLIENT_ID)
  .action(loginAction);

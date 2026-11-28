import { Command } from "commander";
import chalk from "chalk";
import yoctoSpinner from "yocto-spinner";
import { select } from "@clack/prompts";

import { SERVER_BASE_URL, START_OPTIONS } from "@/constant";
import { getStoredToken } from "@/lib/token";
import { prisma } from "@/lib/prisma";

/* ------------------------------ 
Actions
------------------------------*/

const startActions = async () => {
  const token: any = await getStoredToken();

  if (!token?.access_token) {
    console.log(chalk.red("Not Authenticated. please Login"));
    return;
  }

  const spinner = yoctoSpinner({ text: "Fetching user information..." });
  spinner.start();

  const user = await prisma.user.findFirst({
    where: {
      sessions: {
        some: {
          token: token.access_token,
        },
      },
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
    },
  });

  spinner.stop();

  if (!user) {
    console.log(chalk.red("User not found."));
    return;
  }

  console.log(chalk.green(`Welcome back, ${user.name}!\n`));

  const choice = await select({
    message: "Select an Option:",
    options: START_OPTIONS,
  });

  switch (choice) {
    case "chat":
      console.log("Chat is selected")
      break;
    case "tool":
      console.log("Tool Calling is selected")
      break;
    case "agent":
      console.log("Agentic mode is selected")
      break;
  }

};

export const start = new Command("start")
  .description("Start chatting with the AI")
  .action(startActions);

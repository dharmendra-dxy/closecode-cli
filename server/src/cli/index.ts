#!/usr/bin/env node

import "dotenv/config";
import chalk from "chalk";
import figlet from "figlet";

import { Command } from "commander";
import { login, logout, whoami } from "@/cli/commands/auth";
import { start } from "@/cli/commands/ai";

async function main() {
  //Display Banner
  console.log(
    chalk.cyan(
      figlet.textSync("Close Code CLI", {
        font: "Standard",
        horizontalLayout: "default",
      }),
    ),
  );

  console.log(chalk.green("A cli based AI Tool \n"));

  const program = new Command("closecode");

  program
    .version("0.0.1")
    .description("CloseCode CLI - A Cli Based AI Tool")
    .addCommand(login)
    .addCommand(logout)
    .addCommand(whoami)
    .addCommand(start);

    
  // Default action shows help
  program.action(() => {
    program.help();
  });

  program.parse();
}

main().catch((err) => {
  console.log(chalk.red("Error running CloseCode CLI:"), err);
  process.exit(1);
});

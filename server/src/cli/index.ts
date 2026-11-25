#!/usr/bin/env node

import dotenv from "dotenv";
import chalk from "chalk";
import figlet from "figlet";

import { Command } from "commander";
import { login } from "./commands/auth.js";


dotenv.config();

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
    .addCommand(login);

    
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

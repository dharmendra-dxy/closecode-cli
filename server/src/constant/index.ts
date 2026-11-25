import dotenv from "dotenv";
import os from "os";
import path from "path";


dotenv.config();

export const FRONTEND_BASE_URL= process.env.FRONTEND_BASE_URL
export const SERVER_BASE_URL= process.env.SERVER_BASE_URL

export const BETTER_AUTH_VERIFICATION_URI = `${FRONTEND_BASE_URL}/device`;
export const TOKEN_ENDPOINT = "/device/token"


export const CLI_CLIENT_ID = "close-code-cli";
export const CONFIG_DIR = path.join(os.homedir(), ".closecode-cli");
export const TOKEN_FILE = path.join(CONFIG_DIR, "token.json");

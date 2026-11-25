import { deviceAuthorizationClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  /** The base URL of the server */
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,

  plugins: [
    deviceAuthorizationClient(), 
  ],
});

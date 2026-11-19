import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma.js";
import { deviceAuthorization } from "better-auth/plugins";
import { BETTER_AUTH_VERIFICATION_URI } from "../constant/index.js";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  trustedOrigins: [
    process.env.FRONTEND_BASE_URL ?? "http://localhost:3000",
  ],

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
    autoSignIn: true,
  },

  plugins: [
    deviceAuthorization({ 
      verificationUri: BETTER_AUTH_VERIFICATION_URI, 
    }), 
  ],
});

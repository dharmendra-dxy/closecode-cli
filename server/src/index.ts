import "dotenv/config";
import express from "express";
import cors from "cors";

import { toNodeHandler } from "better-auth/node";
import { auth } from "@/lib/auth";

import { google, GoogleLanguageModelOptions } from "@ai-sdk/google";
import { generateText } from "ai";

const app = express();
const PORT = process.env.PORT;

// configure cors options:
const corsOption = {
  origin: (process.env.CORS_ORIGIN ?? "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOption));

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/ai", async (req, res) => {
  console.log("Hello I am called");
  try {
    const { text, reasoning } = await generateText({
      model: 'google/gemini-4-hydrogen',
      prompt: "What is the sum of the first 10 prime numbers?",
      providerOptions: {
        google: {
          thinkingConfig: {
            thinkingLevel: "low",
            includeThoughts: true,
          },
        } satisfies GoogleLanguageModelOptions,
      },
    });

    res.send(text);
  } catch (error) {
    console.error("AI generation failed:", error);
    res.status(500).send("Failed to generate AI response");
  }
});

app.listen(PORT, () => {
  return console.log(`Express is listening at http://localhost:${PORT}`);
});

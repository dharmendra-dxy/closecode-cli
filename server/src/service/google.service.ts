import { aiConfig } from "@/config/google.config";
import { google } from "@ai-sdk/google";
import { convertToModelMessages, generateObject, streamText } from "ai";
import chalk from "chalk";

export class AIService {
  private model: ReturnType<typeof google>;

  constructor() {
    if (!aiConfig.googleApiKey) {
      throw new Error("Google_API_Key is not defined");
    }
    if (!aiConfig.googleModel) {
      throw new Error("Google_API_MODEL is not defined");
    }

    this.model = google(aiConfig.googleModel);
  }

  /** -----------------------------------------
      STREAMING RESPONSE:
  
     * Send a message and get streaming responser
     * @param {Array} messages
     * @param {Function} onChunk
     * @param {Object} tools 
     * @param {Function} onToolCall
     * @returns {Promise<Object>}
    ----------------------------------------- */

  async sendMessage(
    messages: any[],
    onChunk: any,
    tools = undefined,
    onToolCall = null,
  ) {
    try {
      const streamConfig = {
        model: this.model,
        messages: messages,
      };

      const result = streamText(streamConfig);

      let fullResponse = "";

      for await (const chunk of result.textStream) {
        fullResponse += chunk;
        if (onChunk) {
          onChunk(chunk);
        }
      }

      const fullResult = result;

      return {
        content: fullResponse,
        finishResponse: fullResult.finishReason,
        usage: fullResult.usage,
        steps: fullResult.steps,
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(chalk.red("AI Service Error:"), error.message);
        throw error;
      }
      console.error(chalk.red("AI Service Error:"), error);
      throw new Error("An unexpected error occurred");
    }
  }

  /** -----------------------------------------
      NON - STREAMING RESPONSE:
  
    * Get a non-streaming response
   * @param {Array} messages - Array of message objects
   * @param {Object} tools - Optional tools
   * @returns {Promise<string>} Response text
    ----------------------------------------- */

  async getMessage(messages: [], tools = undefined) {
    let fullResponse = "";
    const result = await this.sendMessage(
      messages,
      (chunk: any) => {
        fullResponse += chunk;
      },
      tools,
    );

    return result.content;
  }

  /**-----------------------------------------
   * STRUCTURED OUTPUT
   * Generate structured output using a zod schema
   * @param {Object} schema - Zod Schema
   * @param {string} prompt - Prompt for generation
   * @returns {Promise<Object>} Parsed object matching the schema
   -----------------------------------------*/
}

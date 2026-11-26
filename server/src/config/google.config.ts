import 'dotenv/config';

export const aiConfig = {
  googleApiKey : process.env.GOOGLE_GENERATIVE_AI_API_KEY,
  googleModel : process.env.GOOGLE_GENERATIVE_AI_MODEL,
}
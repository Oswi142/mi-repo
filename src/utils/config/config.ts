import * as dotenv from "dotenv";
dotenv.config();

export const config = {
  baseUrl: process.env.BASE_URL || "",
  apiBaseUrl: process.env.API_BASE_URL || "",
};
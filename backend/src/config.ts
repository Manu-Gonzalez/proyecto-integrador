import dotenv from 'dotenv';
dotenv.config();

export const {
  PORT,
  DATABASE_URL,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET
} = process.env;



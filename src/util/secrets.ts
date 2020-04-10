import logger from "./logger";
import dotenv from "dotenv";
import chalk from "chalk";
import fs from "fs";

const log: any = console.log;

export const ENVIRONMENT: string | number = process.env.NODE_ENV;
const isProd: boolean = ENVIRONMENT === "production";

if (fs.existsSync(".env")) {
    log(chalk.yellow("Using .env file to supply config environment variables"));
    dotenv.config({ path: ".env" });
} else {
    log(chalk.yellow("Using .env.example file to supply config environment variables"));
    dotenv.config({ path: ".env.example" }); 
}

export const SESSION_SECRET: string = process.env["SESSION_SECRET"];
export const MONGODB_URI: string = isProd ? process.env["MONGODB_URI"] : process.env["MONGODB_URI_LOCAL"];

if (!SESSION_SECRET) {
    logger.error("No client secret. Set SESSION_SECRET environment variable.");
    process.exit(1);
}

if (!MONGODB_URI) {
    if (isProd)
        logger.error("No mongo connection string. Set MONGODB_URI environment variable.");
    else
        logger.error("No mongo connection string. Set MONGODB_URI_LOCAL environment variable.");
    process.exit(1);
}

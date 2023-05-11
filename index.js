console.clear();
import dotenv from "dotenv";
dotenv.config();
import { start } from "./src/server.js";

const PORT = process.env.PORT || process.argv[2] || 3000;
start(PORT);

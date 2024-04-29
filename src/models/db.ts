import { createPool } from "mysql2";
import dotenv from "dotenv";

dotenv.config();

var databaseUrl = process.env.DATABASE_URL as string;
var db = createPool(databaseUrl);

export default db;
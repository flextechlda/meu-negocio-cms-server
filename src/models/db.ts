import { database_config } from "../config/dbConfig";
import { createPool } from "mysql2";

var db = createPool(
    database_config as unknown as Parameters<typeof createPool>[0]
);

export default db;

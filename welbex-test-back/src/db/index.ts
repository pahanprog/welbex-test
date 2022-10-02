import { Pool, QueryResult } from "pg";
import { config } from "dotenv";

config();

// create db connection
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: parseInt(process.env.PG_PORT!),
});

// export query method
export default {
  query: (
    text: string,
    params: any[],
    callback: (err: Error, result: QueryResult<any>) => void
  ) => {
    return pool.query(text, params, callback);
  },
};

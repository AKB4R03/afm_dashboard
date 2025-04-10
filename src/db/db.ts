import { Pool } from "pg";

const pool = new Pool({
  connectionString: "postgresql://postgres:postgres@localhost:5432/AFM_DB",
});

export const query = (text: string, params?: any[]) => {
  return pool.query(text, params);
};

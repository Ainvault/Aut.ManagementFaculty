import pg from "pg";

const { Client } = pg;

const client = new Client({
  host: "138.124.117.71",
  port: 5432,
  database: "ManagmentWebSite_Db",
  user: "managment_web",
  password: "hD3H9seTqX1GJMu1mDJBGDYr",
  connectionTimeoutMillis: 20000,
});

try {
  await client.connect();
  const info = await client.query(`
    SELECT
      version() AS version,
      current_database() AS database,
      current_user AS username,
      pg_encoding_to_char(encoding) AS encoding
    FROM pg_database
    WHERE datname = current_database()
  `);
  console.log("CONNECTION_OK");
  console.log(JSON.stringify(info.rows[0], null, 2));

  const tables = await client.query(`
    SELECT table_schema, table_name
    FROM information_schema.tables
    WHERE table_schema NOT IN ('pg_catalog', 'information_schema')
    ORDER BY 1, 2
  `);
  console.log("tables_count:", tables.rows.length);
  console.log(JSON.stringify(tables.rows, null, 2));
} catch (error) {
  console.error("CONNECTION_FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
} finally {
  await client.end().catch(() => {});
}

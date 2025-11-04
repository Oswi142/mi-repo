import mysql, { Connection } from "mysql2/promise";

export async function getConnection(): Promise<Connection> {
  return mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "yourls",
    port: 3306,
  });
}
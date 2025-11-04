import { Connection } from "mysql2/promise";
import { getConnection } from "./Connection";

export class DatabaseClient {
  private connection: Connection | null = null;
  async connect() {
    this.connection = await getConnection();
  }
  async query(sql: string, params: any[] = []) {
    if (!this.connection) throw new Error("DB connection not initialized");
    const [rows] = await this.connection.execute(sql, params);
    return rows;
  }
  async disconnect() {
    if (this.connection) {
      await this.connection.end();
      this.connection = null;
    }
  }
}
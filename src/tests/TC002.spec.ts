import { mergeTests, expect } from "@playwright/test";
import { test as loggedInTest } from "../fixtures/LoggedInPageFixture";
import { test as dashboardPage } from "../fixtures/DashboardFixture";
import { ApiClient } from "../utils/api/ApiClient";
import { EndPoints } from "../utils/api/EndPoint";
import { getConnection } from "../utils/database/Connection";
import { Connection, RowDataPacket } from "mysql2/promise";

const test = mergeTests(loggedInTest, dashboardPage);

let connection: Connection;
let api: ApiClient;

test.describe("YOURLS - Edit Short URL", () => {
  test.beforeAll(async () => {
    api = new ApiClient("http://localhost:8080");
    await api.init();
    connection = await getConnection();
  });

  test("TC002 - Edit short URL in UI and verify in API + DB", async ({ dashboardPage }) => {
    const ts = Date.now();
    const newKeyword = `edited${ts}`;

    await dashboardPage.clickFirstRow();
    await dashboardPage.clickEditButton();
    await dashboardPage.fillNewKeyword(newKeyword);
    await dashboardPage.clickSubmitChangesButton();

    const params = {
      signature: "caed1384a5",
      action: "expand",
      shorturl: newKeyword,
      format: "json",
    };

    const response = await api.get(EndPoints.yourls.basic, params);
    const json = await response.json();
    console.log("API response data:", json);

    expect(response.status(), "Status code").toBe(200);

    const bodyStr = JSON.stringify(json);
    expect(bodyStr).toContain(newKeyword);
    expect(bodyStr).toContain("http");

    const [rows] = await connection.execute<RowDataPacket[]>(
      "SELECT * FROM yourls_url WHERE keyword = ? LIMIT 1;",
      [newKeyword]
    );
    expect(rows.length, "Row updated in DB").toBe(1);
    console.log("Database row:", rows[0]);
  });

  test.afterAll(async () => {
    await connection.end();
  });
});

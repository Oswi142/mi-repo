import { test as base } from "./LoginPageFixture";
import * as dotenv from "dotenv";

dotenv.config();

export const test = base.extend({});

test.beforeEach(async ({ loginPage: loginPage }) => {
  await loginPage.goTo();
  await loginPage.fillUsernameField(process.env.USER_NAME || "");
  await loginPage.fillPasswordField(process.env.USER_PASSWORD || "");
  (await loginPage.getSubmitButton()).click();
});

export { expect } from "@playwright/test";
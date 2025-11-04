import { Page } from "@playwright/test";
import { LoginLocators } from "../locators/LoginLocators";

export class LoginPage {
  constructor(public page: Page) {}

  async goTo() {
    await this.page.goto("/admin");
  }

  async fillUsernameField(username: string) {
    await this.page.locator(LoginLocators.usernameField).fill(username);
  }

  async fillPasswordField(password: string) {
    await this.page.locator(LoginLocators.passwordField).fill(password);
  }

  async getSubmitButton() {
    return this.page.locator(LoginLocators.submitButton);
  }
}
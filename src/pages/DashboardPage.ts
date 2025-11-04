import { Page } from "@playwright/test";
import { DashboardLocators } from "../locators/DashboardLocators";

export class DashboardPage {
  constructor(public page: Page) {}

  async goTo() {
    await this.page.goto("/admin/index=php?");
  }

  async fillURL(urlLink: string) {
    await this.page.locator(DashboardLocators.urlField).fill(urlLink);
  }

  async fillKeyword(keyword: string) {
    await this.page.locator(DashboardLocators.keywordField).fill(keyword);
  }

  async clickCreateShortUrl() {
    await this.page.locator(DashboardLocators.shortenUrlButton).click();
  }

  async clickFirstRow() {
    const hoverRow = await this.page
      .locator(DashboardLocators.firstRowTable)
      .first();
    await hoverRow.hover();
  }

  async clickEditButton() {
    await this.page.locator(DashboardLocators.editButton).click();
  }

  async fillNewKeyword(newKeyword: string) {
    await this.page.locator(DashboardLocators.newKeywordField).fill(newKeyword);
  }
  
  async clickSubmitChangesButton() {
    await this.page.locator(DashboardLocators.submitChangesButton).click();
  }

  async getKeywordInTable() {
    return await this.page.locator(DashboardLocators.keywordInList).innerText();
  }
}
import { Page, Locator } from "@playwright/test";
export class HomePage {
  constructor(private page: Page) {}
  async open(): Promise<void> { await this.page.goto("data:text/html,<h1>Welcome back</h1>"); }
  heading(): Locator { return this.page.getByRole("heading", { name: "Welcome back" }); }
}

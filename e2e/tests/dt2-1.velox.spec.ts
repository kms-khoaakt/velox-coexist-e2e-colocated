// @tms DT2-1
import { test, expect, chromium } from '@playwright/test';
import { HomePage } from '../pages/home.page';
// @velox-engine playwright  (agentic authoring loop — attaches the Velox browser over CDP)
test("DT2-1 coexist", async () => {
  const cdp = process.env.VELOX_CDP_URL;
  if (!cdp) throw new Error('VELOX_CDP_URL not set');
  const browser = await chromium.connectOverCDP(cdp);
  // FRESH isolated context per run (no cookie/session bleed) — a login test always starts logged out.
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  let __step = 0;
  // The body calls step('<test-case step text>', async () => { … }). It records one test.step
  // (the per-step verdict join key) and captures that step's screenshot.
  const step = async (title: string, fn: () => Promise<void>): Promise<void> => {
    await test.step(title, async () => {
      __step++;
      try {
        await fn();
      } finally {

      }
    });
  };
  try {
    await step('Open the home page', async () => { const home = new HomePage(page); await home.open(); });
    await step('Verify the welcome heading is shown', async () => { const home = new HomePage(page); await expect(home.heading()).toBeVisible({ timeout: 15000 }); });
  } finally {
    await ctx.close().catch(() => {});
    await browser.close().catch(() => {});
  }
});

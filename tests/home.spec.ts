import { test, expect } from "@playwright/test";
test("campaign is responsive and interactions are honest and accessible", async ({
  page,
}, info) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Manifest",
  );
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await expect(page.getByLabel("Land fund statistics")).toContainText("$0");
  await expect(page.getByLabel("Land fund statistics")).toContainText(
    "Goal TBD",
  );
  await page.locator(".windmill-photo").scrollIntoViewIfNeeded();
  await expect(page.locator(".windmill-photo img")).toHaveJSProperty(
    "complete",
    true,
  );
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({
    path: `test-results/${info.project.name}.png`,
    fullPage: true,
  });
  await page.getByRole("button", { name: "survey", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "survey", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: /Land type 01/ }).click();
  await expect(page.getByRole("region", { name: "Grassland" })).toContainText(
    "not an identified property",
  );
  await page.getByRole("button", { name: "Close land information" }).click();
  await page.getByRole("button", { name: "Contribute", exact: true }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await dialog.getByRole("button", { name: "Other", exact: true }).click();
  await dialog.getByLabel("Custom amount (USD)").fill("42.50");
  await dialog.getByLabel("Use a public display name").check();
  await dialog
    .getByLabel("Display name", { exact: true })
    .fill("Preview supporter");
  await expect(
    dialog.getByRole("button", { name: "Checkout not connected" }),
  ).toBeDisabled();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(
    page.getByRole("button", { name: "Contribute", exact: true }),
  ).toBeFocused();
  await page.getByRole("button", { name: "View all updates" }).click();
  await expect(
    page.getByRole("heading", {
      name: "The horizon remains a long-term objective.",
    }),
  ).toBeVisible();
  await page.getByRole("button", { name: "View full ledger" }).click();
  await expect(
    page.getByText("0 entries. Verified contribution data"),
  ).toBeVisible();
  await page
    .locator("summary")
    .filter({ hasText: "Do supporters own any part of the land?" })
    .click();
  await expect(
    page.getByText("No. Contributions provide no equity", { exact: false }),
  ).toBeVisible();
  if (info.project.name === "mobile") {
    await page.getByRole("button", { name: "Open navigation" }).click();
    await page
      .getByRole("navigation")
      .getByRole("link", { name: "FAQ", exact: true })
      .click();
    await expect(
      page.getByRole("button", { name: "Open navigation" }),
    ).toHaveAttribute("aria-expanded", "false");
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe("auto");
  expect(errors).toEqual([]);
});

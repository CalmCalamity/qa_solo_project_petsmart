import { PetsmartPage } from "../PetsmartPage";
import { WebDriver, Builder, Capabilities, By } from "selenium-webdriver";

const driver: WebDriver = new Builder()
  .withCapabilities(Capabilities.chrome())
  .build();
const page = new PetsmartPage(driver);

// variable for tests
const about = By.xpath("//a [contains(text(), 'About')]");
const helpCenter = By.xpath("//a [contains(text(), 'Help Center')]");


describe("Footer Tests", () => {
    // Before tests open the page and close the popup
    beforeEach(async () => {
      await page.navigate();
    }, 30000);
    // After tests kill the connections
    afterAll(async () => {
      await driver.quit();
    });

    // Test that checks About
    test("About", async () => {
        await page.click(about);
        // await page.click(OtherButton);
        expect(await page.getBody()).toContain("ABOUT PETSMART");
    }, 60000);

    // Test that checks Help Center
    test("Help Center", async () => {
        await page.click(helpCenter);
        // await page.click(OtherButton);
        expect(await page.getBody()).toContain("how can we help you");
    }, 60000);
});
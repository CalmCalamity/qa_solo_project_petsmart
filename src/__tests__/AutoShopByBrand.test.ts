import { PetsmartPage } from "../PetsmartPage";
import { WebDriver, Builder, Capabilities, By } from "selenium-webdriver";

const driver: WebDriver = new Builder()
  .withCapabilities(Capabilities.chrome())
  .build();
const page = new PetsmartPage(driver);

// variable for tests
const subMenu = By.xpath("//a [contains(text(), 'Shop by Brand')]");
const brandTitle= "shop by brand"
const brandElement = By.xpath("//a [contains(text(), 'Fluval')]");
const brand = "Fluval";

describe("Shop By Brand Tests", () => {
    // Before tests open the page and close the popup
    beforeEach(async () => {
      await page.navigate();
    }, 30000);
    // After tests kill the connections
    afterAll(async () => {
      await driver.quit();
    });

    // Test to check navigate to shop by brand
    test("Shop By Brand", async () => {
      await page.openSubMenu(subMenu);
      expect(await page.getText(page.brandTitle)).toContain(brandTitle)
  }, 60000);

    // Test for a specific brand
    test("Fluval Brand", async () => {
        await page.openSubMenu(subMenu);
        expect(await page.getText(page.brandTitle)).toContain(brandTitle)
        await page.click(brandElement);
        expect(await page.getBody()).toContain(brand);
    }, 60000);
});
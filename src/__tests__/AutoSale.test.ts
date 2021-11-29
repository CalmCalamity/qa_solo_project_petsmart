import { PetsmartPage } from "../PetsmartPage";
import { WebDriver, Builder, Capabilities, By } from "selenium-webdriver";

const driver: WebDriver = new Builder()
  .withCapabilities(Capabilities.chrome())
  .build();
const page = new PetsmartPage(driver);

// variable for tests
const sale = By.xpath("//*[@id='main']/div[1]/div[9]/section[2]/div[1]/section/div/div[4]/a");
let subMenu: By;
let terMenu: By;

describe("Sale Tests", () => {
    // Before tests open the page and close the popup
    beforeEach(async () => {
      await page.navigate();
    }, 30000);
    // After tests kill the connections
    afterAll(async () => {
      await driver.quit();
    });

    // Test that checks on Sale link
    test("Sale", async () => {
        await page.click(sale);
        expect(await page.getText(page.pageTitle)).toContain("sale");
    }, 60000);

    // Test that checks on Clearance from Sale menu
    test("Sale Clearance", async () => {
        subMenu = By.xpath("//a [@data-gtm='sale']");
        terMenu = By.xpath("//a [contains(text(), 'Clearance')]");

        await page.openTerMenu(subMenu, terMenu);
        expect(await page.getText(page.pageTitle)).toContain("Clearance");
    }, 60000);
});
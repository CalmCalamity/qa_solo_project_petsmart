import { PetsmartPage } from "../PetsmartPage";
import { WebDriver, Builder, Capabilities, By } from "selenium-webdriver";

const driver: WebDriver = new Builder()
  .withCapabilities(Capabilities.chrome())
  .build();
const page = new PetsmartPage(driver);

// variable for tests
let subMenu: By;
let terMenu: By;
let quadMenu: By;

describe("Shop By Pets Tests", () => {
    // Before tests open the page and close the popup
    beforeEach(async () => {
      await page.navigate();
    }, 30000);
    // After tests kill the connections
    afterAll(async () => {
      await driver.quit();
    });

    // Test that checks on Dog
    test("Dog Heartworm", async () => {
        subMenu = By.xpath("//a [@data-gtm='pharmacy']");
        terMenu = By.xpath("//*[@id='navigation']/div[3]/div[1]/ul/li[9]/div[2]/div/ul/li[1]/a");
        quadMenu = By.xpath("//a [@data-gtm='pharmacy:dog:heartworm']");

        await page.openQuadMenu(subMenu, terMenu, quadMenu);
        expect(await page.getText(page.pageTitle)).toContain("Heartworm");
    }, 60000);

    // Test that checks on Cat
    test("Cat Allergy Relief", async () => {
        subMenu = By.xpath("//a [@data-gtm='pharmacy']");
        terMenu = By.xpath("//*[@id='navigation']/div[3]/div[1]/ul/li[9]/div[2]/div/ul/li[2]/a");
        quadMenu = By.xpath("//a [@data-gtm='pharmacy:cat:allergy-relief']");

        await page.openQuadMenu(subMenu, terMenu, quadMenu);
        expect(await page.getText(page.pageTitle)).toContain("Allergy Relief");
    }, 60000);

    // Test that checks on Livestock
    test("Livestock Medical Supplies", async () => {
        subMenu = By.xpath("//a [@data-gtm='pharmacy']");
        terMenu = By.xpath("//*[@id='navigation']/div[3]/div[1]/ul/li[9]/div[2]/div/ul/li[3]/a");
        quadMenu = By.xpath("//a [@data-gtm='pharmacy:livestock:medical-supplies']");

        await page.openQuadMenu(subMenu, terMenu, quadMenu);
        expect(await page.getText(page.pageTitle)).toContain("Medical Supplies");
    }, 60000);
});
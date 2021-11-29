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
    test("Dog Jerky", async () => {
        subMenu = By.xpath("//a [@data-gtm='dog']");
        terMenu = By.xpath("//*[@id='navigation']/div[3]/div[1]/ul/li[3]/div[2]/div/ul/li[2]/a");
        quadMenu = By.xpath("//a [@data-gtm='dog:treats:jerky']");

        await page.openQuadMenu(subMenu, terMenu, quadMenu);
        expect(await page.getText(page.pageTitle)).toContain("Jerky");
    }, 60000);

    // Test that checks on Cat
    test("Cat Tunnels", async () => {
        subMenu = By.xpath("//a [@data-gtm='cat']");
        terMenu = By.xpath("//*[@id='navigation']/div[3]/div[1]/ul/li[4]/div[2]/div/ul/li[3]/a");
        quadMenu = By.xpath("//a [@data-gtm='cat:toys:tunnels']");

        await page.openQuadMenu(subMenu, terMenu, quadMenu);
        expect(await page.getText(page.pageTitle)).toContain("Tunnels");
    }, 60000);

    // Test that checks on Fish
    test("Fish Starter Kits", async () => {
        subMenu = By.xpath("//a [@data-gtm='fish']");
        terMenu = By.xpath("//*[@id='navigation']/div[3]/div[1]/ul/li[5]/div[2]/div/ul/li[8]/a");

        await page.openTerMenu(subMenu, terMenu);
        expect(await page.getText(page.pageTitle)).toContain("Starter Kits");
    }, 60000);

    // Test that checks on Bird
    test("Bird Baths", async () => {
        subMenu = By.xpath("//a [@data-gtm='bird']");
        terMenu = By.xpath("//*[@id='navigation']/div[3]/div[1]/ul/li[6]/div[2]/div/ul/li[5]/a");
        quadMenu = By.xpath("//a [@data-gtm='bird:grooming:bird-baths']");

        await page.openQuadMenu(subMenu, terMenu, quadMenu);
        expect(await page.getText(page.pageTitle)).toContain("Bird Baths");
    }, 60000);

    // Test that checks on Reptile
    test("Reptile Live", async () => {
        subMenu = By.xpath("//a [@data-gtm='reptile']");
        terMenu = By.xpath("//*[@id='navigation']/div[3]/div[1]/ul/li[7]/div[2]/div/ul/li[9]/a");
        quadMenu = By.xpath("//a [@data-gtm='reptile:live-reptiles:snakes,-turtles-&-more']");

        await page.openQuadMenu(subMenu, terMenu, quadMenu);
        expect(await page.getText(page.pageTitle)).toContain("Snakes, Turtles & More");
    }, 60000);

    // Test that checks on Small Pet
    test("Small Pet Litter Pans", async () => {
        subMenu = By.xpath("//a [@data-gtm='small-pet']");
        terMenu = By.xpath("//*[@id='navigation']/div[3]/div[1]/ul/li[8]/div[2]/div/ul/li[4]/a");
        quadMenu = By.xpath("//a [@data-gtm='small-pet:litter-&-bedding:litter-pans']");

        await page.openQuadMenu(subMenu, terMenu, quadMenu);
        expect(await page.getText(page.pageTitle)).toContain("Litter Pans");
    }, 60000);
});
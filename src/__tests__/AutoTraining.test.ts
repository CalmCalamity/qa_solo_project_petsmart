import { PetsmartPage } from "../PetsmartPage";
import { WebDriver, Builder, Capabilities, By } from "selenium-webdriver";

const driver: WebDriver = new Builder()
  .withCapabilities(Capabilities.chrome())
  .build();
const page = new PetsmartPage(driver);

const training = By.xpath("(//img [@class='home__mobile-service-icon'])[4]");
const storeLocator = By.className("store-locator__change");
const storeLocatorSelect = By.className("store-locator__select");
const storeLocatorCurrent = By.className("store-locator__search-current-location");
const storeClosest = By.xpath("(//a [@class='store-locator__result-link'])[1]");
const availibility = By.className("styleguide__primary-cta training__cta ");
const firstDate = By.xpath("(//a [@class='styleguide__secondary-cta booking__price-cta '])[1]");
const book = By.className("styleguide__primary-cta booking__cta");

describe("Training Tests", () => {
    // Before tests open the page and close the popup
    beforeAll(async () => {
      await page.navigate();
    }, 30000);
    // After tests kill the connections
    afterAll(async () => {
      await driver.quit();
    });
  
    // Test signs up for a training class
    test("Dog Training Test", async () => {
        await page.openServices();
        await page.click(training);
        expect(await page.getText(page.landingTitle)).toContain("Dog Training");
        try {
          await page.click(storeLocatorSelect);
        } catch {
          await page.click(storeLocator);
        }
        await page.click(storeLocatorCurrent);
        await page.click(storeClosest);
        await page.click(availibility);
        await page.click(firstDate);
        await page.click(book);
        expect(await page.getText(page.loginTitle)).toContain("log in to complete booking");
    }, 60000);
});
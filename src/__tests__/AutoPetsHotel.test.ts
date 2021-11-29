import { PetsmartPage } from "../PetsmartPage";
import { WebDriver, Builder, Capabilities, By } from "selenium-webdriver";

const driver: WebDriver = new Builder()
  .withCapabilities(Capabilities.chrome())
  .build();
const page = new PetsmartPage(driver);

const petsHotel = By.xpath("(//img [@class='home__mobile-service-icon'])[2]");
const storeLocator = By.className("store-locator__change");
const storeLocatorCurrent = By.className("store-locator__search-current-location");
const storeClosest = By.xpath("(//a [@class='store-locator__result-link'])[1]");
const book = By.className("styleguide__button-content pets-hotel__check-rates-text");

describe("Search Tests", () => {
    // Before tests open the page and close the popup
    beforeAll(async () => {
      await page.navigate();
    }, 30000);
    // After tests kill the connections
    afterAll(async () => {
      await driver.quit();
    });
  
    // Test requests a stay for a pet
    test("PetHotel Test", async () => {
        await page.openServices();
        await page.click(petsHotel);
        expect(await page.getText(page.landingTitle)).toContain("PetsHotel Pet Boarding");
        await page.click(storeLocator);
        await page.click(storeLocatorCurrent);
        await page.click(storeClosest);
        // unable to get working code to submit a date with the format the site uses
        expect(await page.getText(book)).toContain("check rates &\nrequest reservation");
    }, 60000);
});
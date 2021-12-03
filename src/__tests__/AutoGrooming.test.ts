import { PetsmartPage } from "../PetsmartPage";
import { WebDriver, Builder, Capabilities, By } from "selenium-webdriver";

const driver: WebDriver = new Builder()
  .withCapabilities(Capabilities.chrome())
  .build();
const page = new PetsmartPage(driver);

const storeLocator = By.className("store-locator__change");
const storeLocatorSelect = By.className("store-locator__select");
const storeLocatorCurrent = By.className("store-locator__search-current-location");
const storeClosest = By.xpath("(//a [@class='store-locator__result-link'])[1]");
const grooming = By.xpath("(//img [@class='home__mobile-service-icon'])[1]");
const speciesCat = By.xpath("//h5 [contains(text(), 'cat')]");
const speciesDog = By.xpath("//h5 [contains(text(), 'dog')]");
const breed  = By.xpath("//*[@id='react-select-2--value']/div[2]/input");
const age  = By.xpath("//*[@id='react-select-3--value']/div[2]/input");
const submit = By.className("styleguide__primary-cta grooming__cta ");
const book = By.xpath("(//button [@class='styleguide__primary-cta styleguide__secondary-cta'])[1]");

describe("Grooming Tests", () => {
    // Before tests open the page and close the popup
    beforeAll(async () => {
      await page.navigate();
    }, 30000);
    // After tests kill the connections
    afterAll(async () => {
      await driver.quit();
    });
  
    // Test that schedules a grooming
    test("Grooming Test", async () => {
      await page.openServices();
      await page.click(grooming);
      expect(await page.getText(page.landingTitle)).toContain("Grooming Salon");
      try {
          await page.click(storeLocator);
      } catch {
        await page.click(storeLocatorSelect);
      }
      await page.click(storeLocatorCurrent);
      await page.click(storeClosest);
      await page.click(speciesCat);
      await page.setInput(breed, `Russian\n`);
      await page.setInput(age, `6\n`);
      await page.click(submit);
      await page.click(book);
      expect(await page.getText(page.loginTitle)).toContain("log in to complete booking");
    }, 60000);
});
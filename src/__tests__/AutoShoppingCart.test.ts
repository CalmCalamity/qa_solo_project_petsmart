import { PetsmartPage } from "../PetsmartPage";
import { WebDriver, Builder, Capabilities } from "selenium-webdriver";

const driver: WebDriver = new Builder()
  .withCapabilities(Capabilities.chrome())
  .build();
const page = new PetsmartPage(driver);

// variables for tests
const searchQuery1: string = "cat bed";
const searchQuery2: string = "dog collar";

let product1: string = null;
let product2: string = null;

describe("Shopping Cart Tests", () => {
    // Before tests open the page and close the popup
    beforeAll(async () => {
        await page.navigate();
    }, 30000);
    // After tests kill the connections
    afterAll(async () => {
        await driver.quit();
    });

    // Test that adds 2 items to a cart
    test("Add to Cart Test", async () => {
        await page.doSearchFeelingLucky(searchQuery1);
        product1 = await page.getText(page.productName);
        console.log(product1);
        await page.addToCart();
        await page.doSearchFeelingLucky(searchQuery2);
        product2 = await page.getText(page.productName);
        console.log(product2);
        await page.addToCart();
        await page.goHome();
        await page.goShoppingCart();

        expect(await page.getText(page.shoppingCartList)).toContain(product1);
        expect(await page.getText(page.shoppingCartList)).toContain(product2);
    }, 60000);

    // Test that runs removes an item from the cart
    // Continues from the previous test
    test("Remove From Cart Test", async () => {
        expect(product1).not.toBeNull();
        expect(product2).not.toBeNull();
        await page.cartRemove();
        expect(await page.getText(page.shoppingCartList)).not.toContain(product1);
    }, 60000);
});
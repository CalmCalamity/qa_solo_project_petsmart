import { By, until, WebDriver } from "selenium-webdriver";
import { BasePage } from "./BasePage";

// url for Best Buy
const mainUrl: string = "https://www.petsmart.com";

export class PetsmartPage extends BasePage{

    search: By = By.className("header-search-bar");
    searchBar: By = By.xpath("(//input [@class='dp-search-input valid'])[1]");
    searchResults: By = By.className("showing-result-msg");
    firstResult: By = By.xpath("(//img [@itemprop='image'])[1]");
    pageBody: By = By.xpath("//body");
    productName: By = By.className("pdp-product-name");
    addToCartButton: By =  By.className("default pdp-add-to-cart bopis");
    addToCartShipButton: By =  By.xpath("//button //p [contains(text(), 'Ship')]");
    shoppingClose: By = By.className("ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only ui-dialog-titlebar-close");
    shoppingCart: By = By.id("mini-cart-mobile");
    shoppingCartList: By =  By.className("items-table");
    cartFirstRemove: By = By.xpath("(//a [@class='pliRemove'])[1]");
    home: By = By.className("primary-logo");
    menu: By = By.className("menu-toggle");
    menuServices: By = By.xpath("//a [@data-gtm='pet-services']");
    pageTitle: By = By.className("heading");
    brandTitle: By = By.className("brand-page-title");
    landingTitle: By = By.className("landing-page__title");
    loginTitle: By = By.className("login__modal-title");
  
    constructor(driver: WebDriver) {
        super(driver, mainUrl);
    }

    // method to open url and check for existing elements
    async navigate() {
        await super.navigate();
        // need to close popup if it exists

        await this.driver.wait(until.elementLocated(this.search));
        await this.driver.wait(until.elementIsVisible(await this.driver.findElement(this.search)));
    }

    async doSearch(text: string) {
        await this.driver.findElement(this.search);
        await this.click(this.search);
        await this.setInput(this.searchBar, `${text}\n`);
    }

    async doSearchFeelingLucky(text: string) {
        await this.doSearch(text);
        await this.click(this.firstResult);
    }

    async getResults() {
        return await this.getText(this.searchResults);
    }

    async getBody() {
        return await this.getText(this.pageBody);
    }

    async getProduct() {
        return await this.getText(this.productName);
    }

    async openMenu() {
        await this.click(this.menu);
    }

    async openSubMenu(elementBy: By) {
        await this.openMenu();
        await this.click(elementBy);
    }

    async openTerMenu(subMenu: By, terMenu: By) {
        await this.openSubMenu(subMenu);
        await this.click(terMenu);
    }

    async openQuadMenu(subMenu: By, terMenu: By, quadMenu: By) {
        await this.openTerMenu(subMenu, terMenu);
        await this.click(quadMenu);
    }

    async openServices() {
        await this.openMenu();
        await this.click(this.menuServices);
    }

    async goHome() {
        await this.click(this.home);
    }

    async goShoppingCart() {
        await this.click(this.shoppingCart);
    }

    async addToCart() {
        // was unable to read that the button was properly disabled when item was out of stock
        // using the shipping cart instead as a work around
        // if there is time will need to look more into this
        await this.driver.wait(until.elementLocated(this.addToCartShipButton));
        await this.driver.wait(until.elementIsVisible(await this.driver.findElement(this.addToCartShipButton)));
        await this.click(this.addToCartShipButton);
        await this.click(this.shoppingClose);
    }

    async doSearchAddToCart(text: string) {
        await this.doSearchFeelingLucky(text);
        await this.addToCart();
    }

    async cartRemove() {
        await this.click(this.cartFirstRemove);
        await this.driver.sleep(2000);
        // await this.click(this.cartConfirmRemove);
    }
}
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
    // checkStock: By = By.className("delivery-method-pdp");

    addToCartButton: By =  By.className("default pdp-add-to-cart bopis");
    addToCartShipButton: By =  By.xpath("//button //p [contains(text(), 'Ship')]");
    shoppingClose: By = By.className("ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only ui-dialog-titlebar-close");
    shoppingCart: By = By.id("mini-cart-mobile");
    shoppingCartList: By =  By.className("items-table");


    home: By = By.className("primary-logo");
    menu: By = By.className("menu-toggle");
    menuServices: By = By.xpath("//a [@data-gtm='pet-services']");
    pageTitle: By = By.className("heading");
    brandTitle: By = By.className("brand-page-title");
    landingTitle: By = By.className("landing-page__title");
    loginTitle: By = By.className("login__modal-title");

    // sku: By = By.className("sku product-data");
    // menuIcon:  By = By.className("liDropdownList");
    menuSupport:  By = By.xpath("//button [contains(text(), 'Support & Services')]");
    menuSupportComputer:  By = By.xpath("//a [contains(text(), 'Computer & Tablet Services')]");
    // pageTitle: By = By.className("page-title");
    // promoTitle: By = By.className("promo-title title");
    // searchTitle: By = By.className("search-title");
    // skuTitle: By =  By.className("sku-title");
    // addToCartButton: By =  By.className("c-button c-button-primary c-button-lg c-button-block c-button-icon c-button-icon-leading add-to-cart-button");
    // continueShoppingButton: By =  By.className("c-button-link continue-shopping");
    // shoppingCartList: By =  By.className("item-list");
    cartFirstRemove: By = By.xpath("(//a [@class='btn-default-link link-styled-button cart-item__remove'])[1]");
    cartConfirmRemove: By = By.xpath("//div/button [@class='c-button-unstyled ']");
    cartFirstSave: By = By.xpath("(//a [@class='btn-default-link link-styled-button cart-item__save'])[1]");
    cartSavedList: By = By.className("sku-card-ref");
  
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

    async checkTitle(title: string) {
        if (await this.driver.findElement(this.pageTitle).isDisplayed()){
            return (await this.getText(this.pageTitle)).includes(title);
        } else if (await this.driver.findElement(this.brandTitle).isDisplayed()){
            return (await this.getText(this.brandTitle)).includes(title);
        // } else if (await this.driver.findElement(this.searchTitle).isDisplayed()){
        //     return (await this.getText(this.searchTitle)).includes(title);
        // } else if (await this.driver.findElement(this.skuTitle).isDisplayed()){
        //     return (await this.getText(this.skuTitle)).includes(title);
        } else return false;
    }

    async goHome() {
        await this.click(this.home);
    }

    async goShoppingCart() {
        await this.click(this.shoppingCart);
    }

    async addToCart() {
        // if (await this.driver.findElement(this.addToCartButton).isEnabled()){
        //     await this.click(this.addToCartButton);
        // } else {
        //     await this.click(this.addToCartShipButton);
        // }

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
        // await this.driver.sleep(2000);
        await this.click(this.cartConfirmRemove);
    }

    async cartSaveForLater() {
        await this.click(this.cartFirstSave);
        await this.click(this.cartConfirmRemove);
    }
}
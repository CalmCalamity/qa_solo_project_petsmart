import { By, until, WebDriver } from "selenium-webdriver";
import { BasePage } from "./BasePage";

// url for Best Buy
const url: string = "https://www.bestbuy.com";

export class BestBuyPage extends BasePage{
    home: By = By.className("logo");
    shoppingCart: By = By.className("cart-icon");
    searchBar: By = By.className("search-input");
    results: By = By.className("col-xs-9");
    firstResult: By = By.xpath("(//img [@class='product-image'])[1]");
    sku: By = By.className("sku product-data");
    cancelPopup: By = By.className("c-close-icon c-modal-close-icon");
    // cancelSurvey: By = By.className("c-close-icon c-modal-close-icon");
    menu: By = By.className("c-button-unstyled hamburger-menu-button");
    menuIcon:  By = By.className("liDropdownList");
    menuSupport:  By = By.xpath("//button [contains(text(), 'Support & Services')]");
    menuSupportComputer:  By = By.xpath("//a [contains(text(), 'Computer & Tablet Services')]");
    recentlyViewed: By = By.className("c-button-unstyled plButton recentlyViewed-button");
    recentlyViewedList: By = By.className("pl-flex-carousel-container v-no-overlay ");
    pageTitle: By = By.className("page-title");
    promoTitle: By = By.className("promo-title title");
    searchTitle: By = By.className("search-title");
    skuTitle: By =  By.className("sku-title");
    addToCartButton: By =  By.className("c-button c-button-primary c-button-lg c-button-block c-button-icon c-button-icon-leading add-to-cart-button");
    continueShoppingButton: By =  By.className("c-button-link continue-shopping");
    shoppingCartList: By =  By.className("item-list");
    cartFirstRemove: By = By.xpath("(//a [@class='btn-default-link link-styled-button cart-item__remove'])[1]");
    cartConfirmRemove: By = By.xpath("//div/button [@class='c-button-unstyled ']");
    cartFirstSave: By = By.xpath("(//a [@class='btn-default-link link-styled-button cart-item__save'])[1]");
    cartSavedList: By = By.className("sku-card-ref");
  
    constructor(driver: WebDriver) {
        super(driver, url);
    }

    // method to open url and check for existing elements
    async navigate() {
        await super.navigate();
        // need to close popup if it exists
        if(await this.driver.findElement(this.cancelPopup).isDisplayed(), 1000){
            await this.click(this.cancelPopup);
            // while the popup is an issue we need to sleep so the site is reachable
            await this.driver.sleep(2000);
        }
        // await this.driver.wait(until.elementLocated(this.searchBar));
        // await this.driver.wait(until.elementIsVisible(await this.driver.findElement(this.searchBar)));
    }

    async doSearch(text: string) {
        await this.setInput(this.searchBar, `${text}`);
        await this.setInput(this.searchBar, `\n`);
    }

    async doSearchFeelingLucky(text: string) {
        await this.doSearch(text);
        await this.click(this.firstResult);
    }

    async getResults() {
        return await this.getText(this.results);
    }

    async getSKU() {
        return await this.getText(this.sku);
    }

    async openMenu() {
        await this.click(this.menu);
    }

    async openSupportMenu() {
        await this.openMenu();
        await this.click(this.menuSupport);
        await this.click(this.menuSupportComputer);
    }

    async checkTitle(title: string) {
        if (await this.driver.findElement(this.pageTitle).isDisplayed()){
            return (await this.getText(this.pageTitle)).includes(title);
        } else if (await this.driver.findElement(this.promoTitle).isDisplayed()){
            return (await this.getText(this.promoTitle)).includes(title);
        } else if (await this.driver.findElement(this.searchTitle).isDisplayed()){
            return (await this.getText(this.searchTitle)).includes(title);
        } else if (await this.driver.findElement(this.skuTitle).isDisplayed()){
            return (await this.getText(this.skuTitle)).includes(title);
        } else return false;
    }

    async goHome() {
        await this.click(this.home);
    }

    async goShoppingCart() {
        await this.click(this.shoppingCart);
    }

    async addToCart() {
        await this.click(this.addToCartButton);
        await this.click(this.continueShoppingButton);
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

    //Commented out code to check if the survey was displayed
    // each click adds 10 seconds to the run time which is not acceptable

    // async click(elementBy: By) {
    //     // check for survey
    //     if(await this.driver.findElement(this.cancelSurvey).isDisplayed()){
    //         await super.click(this.cancelSurvey);
    //         // while the popup is an issue we need to sleep so the site is reachable
    //         await this.driver.sleep(2000);
    //     }

    //     await super.click(elementBy);
    // }
}
const loginPage = require("../pages/loginPage");
const homePage = require("../pages/homePage");
const menPage = require("../pages/menPage");
const myWishListPage = require("../pages/myWishListPage");

describe('Wish list', () => {
    /**
     * Represents page object.
     */
    let page;

    beforeAll(async () => {
        page = await global.__PAGE__;
        await loginPage.login(page);
    });

    it('Adds chosen item to wishlist', async () => {
        await homePage.clickHomePage(page);
        await homePage.clickMenPage(page);
        await menPage.clickTeesButton(page);
        await menPage.clickChosenTees(page);
        await menPage.addToWishList(page);

        expect(await myWishListPage.wishListConfirmationMessage(page)).toContain("Strike Endurance Tee has been added to your Wish List. Click here to continue shopping.");

        await myWishListPage.deleteProduct(page);

        expect(await myWishListPage.wishListConfirmationMessage(page)).toContain("Strike Endurance Tee has been removed from your Wish List.");
    });
});
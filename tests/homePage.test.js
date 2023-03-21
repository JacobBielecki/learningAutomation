const loginPage = require('../pages/loginPage');
const homePage = require('../pages/homePage');

describe('Home page', () => {
    /**
     * Represents page object.
     */
    let page;

    beforeAll(async () => {
        page = await global.__PAGE__;

        await loginPage.login(page);
    });

    it('Redirect to home page.', async () => {
        await homePage.clickHomePage(page);

        expect(await page.title()).toBe('Home Page');
    });
});
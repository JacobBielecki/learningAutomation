const loginPage = require('../pages/loginPage');

describe('Login', () => {
    /**
     * Represents page object.
     */
    let page;

    beforeAll(async () => {
        page = await global.__PAGE__;
    });

    it('Login to test account.', async () => {
        await loginPage.login(page);

        expect(await page.title()).toBe('My Account');
    });
});
const loginPage = require("../pages/loginPage");
const accountPage = require('../pages/accountPage');
const newsletterPage = require('../pages/newsletterPage');

describe('Newsletter', () => {
    /**
     * Represents page object.
     */
    let page;

    beforeAll(async () => {
        page = await global.__PAGE__;

        await loginPage.login(page);
    });

    it('Subscribe and unsubscribe to newsletter', async () => {
    await accountPage.clickNavigationOption(page, "Newsletter Subscriptions");
    await newsletterPage.clickGeneralSubscription(page);
    await newsletterPage.clickSaveButton(page);

    expect(await accountPage.getNewsletterDescriptionText(page)).toContain('You are subscribed to "General Subscription".');

    await accountPage.clickNavigationOption(page, "Newsletter Subscriptions");
    await newsletterPage.clickGeneralSubscription(page);
    await newsletterPage.clickSaveButton(page);

    expect(await accountPage.getNewsletterDescriptionText(page)).toContain("You aren't subscribed to our newsletter.");
    });
});
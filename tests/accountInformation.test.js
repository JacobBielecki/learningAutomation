const loginPage = require("../pages/loginPage");
const accountPage = require("../pages/accountPage");
const accountInformationPage = require('../pages/accountInformation');
const {getText} = require("../utils/utils");

describe('Account Information', () => {
    /**
     * Represents page object.
     */
    let page;

    beforeAll(async () => {
        page = await global.__PAGE__;
        await loginPage.login(page);
    });

    it('Changes Account Information', async () => {
        await accountPage.clickNavigationOption(page, "Account Information");

        const firstName = await accountInformationPage.setFirstName(page);
        const lastName = await accountInformationPage.setLastName(page);
        await accountInformationPage.saveAccountInformation(page);

        expect(await getText(await accountPage.getContactInformation(page))).toContain(firstName, lastName);
        expect(await accountPage.getAccountInformationText(page)).toContain("You saved the account information.");
    });
});
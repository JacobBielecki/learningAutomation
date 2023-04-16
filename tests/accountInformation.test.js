const loginPage = require("../pages/loginPage");
const accountPage = require("../pages/accountPage");
const accountInformation = require('../pages/accountInformation');
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

        const firstName = await accountInformation.firstNameInput(page);
        const lastName = await accountInformation.lastNameInput(page);
        await accountInformation.saveAccountInformation(page);

        expect(await getText(await accountPage.getContactInformation(page))).toContain(firstName, lastName);
        expect(await accountPage.getAccountInformationText(page)).toContain("You saved the account information.");

        //expect(await addressBookPage.getConfirmationMessage(page)).toContain("You deleted the address.");
        //expect(await getText(await addressBookPage.getAddressDetail(page, 1, "First Name"))).toBe(firstName);
    });
});
const loginPage = require('../pages/loginPage');
const accountPage = require('../pages/accountPage');
const {faker} = require('@faker-js/faker');

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
        await accountPage.clickNavigationOption(page, "Address Book");
        await accountPage.clickAddNewAddress(page);
        await accountPage.setFirstNameDetail(page, "Jakub");
        await accountPage.setLastNameDetail(page, "Bielecki");
        await accountPage.setPhoneNumberDetail(page, "+48231234531");
        await accountPage.setStreetAddressDetail(page, `Paczkowa ${Math.ceil(Math.random() * 100)}`);
        await accountPage.setCityDetail(page, "Kraków");
        await accountPage.chooseCountry(page, "PL");
        await accountPage.setPostalCode(page, "37-123");
        await accountPage.chooseProvince(page, "694");
        await accountPage.saveAddress(page, "Save Address");
        //TODO add assertions to all set data.
    });
});
const loginPage = require('../pages/loginPage');
const accountPage = require('../pages/accountPage');
const addressBookPage = require('../pages/addressBookPage');
const {getText} = require("../utils/utils");

describe('Address Book', () => {
    /**
     * Represents page object.
     */
    let page;

    beforeAll(async () => {
        page = await global.__PAGE__;
        await loginPage.login(page);
    });

    it('Adds new address to Address Book and deletes it.', async () => {
        await accountPage.clickNavigationOption(page, "Address Book");
        await addressBookPage.clickAddNewAddress(page);

        const firstName = await addressBookPage.setFirstNameDetail(page);
        const lastName = await addressBookPage.setLastNameDetail(page);
        const phoneNumber = await addressBookPage.setPhoneNumberDetail(page);
        const streetAddress = await addressBookPage.setStreetAddressDetail(page, `Paczkowa ${Math.ceil(Math.random() * 100)}`);
        const city = await addressBookPage.setCityDetail(page);
        const country = await addressBookPage.chooseCountry(page, 'PL');
        const postalCode = await addressBookPage.setPostalCode(page);
        const province = await addressBookPage.chooseProvince(page, 'podkarpackie');
        await addressBookPage.saveAddress(page);

        expect(await getText(await addressBookPage.getFirstName(page, 1))).toBe(firstName);
        expect(await getText(await addressBookPage.getLastName(page, 1))).toBe(lastName);
        expect(await getText(await addressBookPage.getPhoneNumber(page, 1))).toBe(phoneNumber);
        expect(await getText(await addressBookPage.getStreetAddress(page, 1))).toBe(streetAddress);
        expect(await getText(await addressBookPage.getCity(page, 1))).toBe(city);
        expect(await getText(await addressBookPage.getCountry(page, 1))).toBe(country);
        expect(await getText(await addressBookPage.getPostalCode(page, 1))).toBe(postalCode);
        expect(await getText(await addressBookPage.getProvince(page, 1))).toBe(province);

        await addressBookPage.deleteAddress(page);
    });
});
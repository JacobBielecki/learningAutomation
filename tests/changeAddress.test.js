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

        expect(await getText(await addressBookPage.getAddressDetail(page, 1, "First Name"))).toBe(firstName);
        expect(await getText(await addressBookPage.getAddressDetail(page, 1, "Last Name"))).toBe(lastName);
        expect(await getText(await addressBookPage.getAddressDetail(page, 1, "Phone"))).toBe(phoneNumber);
        expect(await getText(await addressBookPage.getAddressDetail(page, 1, "Street Address"))).toBe(streetAddress);
        expect(await getText(await addressBookPage.getAddressDetail(page, 1, "City"))).toBe(city);
        expect(await getText(await addressBookPage.getAddressDetail(page, 1, "Country"))).toBe(country);
        expect(await getText(await addressBookPage.getAddressDetail(page, 1, "Zip/Postal Code"))).toBe(postalCode);
        expect(await getText(await addressBookPage.getAddressDetail(page, 1, "State"))).toBe(province);

        await addressBookPage.deleteAddress(page);

        console.log(1)

        expect(await addressBookPage.getConfirmationMessage(page)).toContain("You deleted the address.");
    });
});
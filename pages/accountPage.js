const COMMON_TIMEOUT = global.__TIMEOUT__;
const {getText} = require('../utils/utils');

const SELECTORS = {
    NAVIGATION_OPTIONS: {
        ADRESS_BOOK: "//a[text()='Address Book']",
        ADD_NEW_ADRESS: "//button[@role='add-address']",
        NEWSLETTER_SUBSCRIPTION: "//a[text()='Newsletter Subscriptions']"
    },
    ADDRESS_DETAILS: {
        FIRSTNAME_INPUT: "//input[@id='firstname']",
        LASTNAME_INPUT: "//input[@id='lastname']",
        PHONENUMBER_INPUT: "//input[@id='telephone']",
        STREETADRESS_INPUT: "//input[@name='street[]']",
        CITY_INPUT: "//input[@name='city']",
        STATEPROVINCE_DROPDOWN: "//select[@name='region_id']",
        POSTALCODE_INPUT: "//input[@name='postcode']",
        COUNTRY_DROPDOWN: "//select[@name='country_id']",
        SAVE_ADDRESS_BUTTON: "//button[@class='action save primary']"
    },
    ACCOUNT_DETAILS: {
        NEWSLETTER_DESCRIPTION: "//div[contains(@class, 'box-newsletter')]//p"
    }
};
const clickNavigationOption = async (page, optionName) => {
    if (optionName === "Address Book") {
        const optionElement = await page.waitForXPath(SELECTORS.NAVIGATION_OPTIONS.ADRESS_BOOK, {
            visible: true,
            timeout: COMMON_TIMEOUT
        });
        await optionElement.click();

        await page.waitForNavigation({timeout: COMMON_TIMEOUT, waitUntil: 'networkidle2'})
    }
};

const clickAddNewAddress = async (page) => {
        const optionElement = await page.waitForXPath(SELECTORS.NAVIGATION_OPTIONS.ADD_NEW_ADRESS, {
            visible: true,
            timeout: COMMON_TIMEOUT
        });
        await optionElement.click();
};

const setFirstNameDetail = async (page, firstName) => {
    const firstNameInput = await page.waitForXPath(SELECTORS.ADDRESS_DETAILS.FIRSTNAME_INPUT);
    await firstNameInput.click({clickCount: 3})
    await firstNameInput.type(firstName);
};

const setLastNameDetail = async (page, lastName) => {
    const lastNameInput = await page.waitForXPath(SELECTORS.ADDRESS_DETAILS.LASTNAME_INPUT);
    await lastNameInput.click({clickCount: 3})
    await lastNameInput.type(lastName);
};

const setPhoneNumberDetail = async (page, phoneNumber) => {
    const phoneNumberInput = await page.waitForXPath(SELECTORS.ADDRESS_DETAILS.PHONENUMBER_INPUT);
    await phoneNumberInput.click();
    await phoneNumberInput.type(phoneNumber);
};

const setStreetAddressDetail = async (page, adressDetail) => {
    const streetAdressInput = await (page.waitForXPath(SELECTORS.ADDRESS_DETAILS.STREETADRESS_INPUT));
    await streetAdressInput.click();
    await streetAdressInput.type(adressDetail);
};

const setCityDetail = async (page, cityDetail) => {
    const cityInput = await (page.waitForXPath(SELECTORS.ADDRESS_DETAILS.CITY_INPUT));
    await cityInput.click();
    await cityInput.type(cityDetail);
};

const setPostalCode = async(page, postalCode) => {
    const setPostalCode = await (page.waitForXPath(SELECTORS.ADDRESS_DETAILS.POSTALCODE_INPUT));
    await setPostalCode.click();
    await setPostalCode.type(postalCode);
};

const chooseCountry = async(page, country_Id) => {
    const countryDropDown = await (page.waitForXPath(SELECTORS.ADDRESS_DETAILS.COUNTRY_DROPDOWN));
    await countryDropDown.click();
    await page.waitForTimeout(1000);
    await countryDropDown.select(country_Id);
    await page.waitForTimeout(1000);
};

const chooseProvince = async (page, region_Id) => {
    const provinceDropDown = await (page.waitForXPath(SELECTORS.ADDRESS_DETAILS.STATEPROVINCE_DROPDOWN));
    await provinceDropDown.click();
    await page.waitForTimeout(1000);
    await provinceDropDown.select(region_Id);
    await page.waitForTimeout(1000);
};

const saveAddress = async (page, optionName) => {
    if (optionName === "Save Address") {
        const optionElement = await page.waitForXPath(SELECTORS.ADDRESS_DETAILS.SAVE_ADDRESS_BUTTON,  {
            visible: true,
            timeout: COMMON_TIMEOUT
    });
        await optionElement.click();
    }
};

const clickNewsletterSubscriptions = async (page) => {
    const optionElement = await page.waitForXPath(SELECTORS.NAVIGATION_OPTIONS.NEWSLETTER_SUBSCRIPTION, {
        visible: true,
        timeout: COMMON_TIMEOUT
    });
    await optionElement.click();
};

const getNewsletterDescriptionText = async (page) => {
    const newsletterDescription = await page.waitForXPath(SELECTORS.ACCOUNT_DETAILS.NEWSLETTER_DESCRIPTION, {visible: true, timeout: COMMON_TIMEOUT});
    return await getText(newsletterDescription);
}

module.exports = {
    clickNavigationOption,
    clickAddNewAddress,
    setFirstNameDetail,
    setLastNameDetail,
    setPhoneNumberDetail,
    setStreetAddressDetail,
    setCityDetail,
    setPostalCode,
    chooseCountry,
    chooseProvince,
    saveAddress,
    clickNewsletterSubscriptions,
    getNewsletterDescriptionText
};
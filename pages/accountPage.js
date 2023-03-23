const COMMON_TIMEOUT = global.__TIMEOUT__;
const {getText} = require('../utils/utils');
const {faker} = require('@faker-js/faker');

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

/**
 * Clicks option from navigation menu.
 * @param page Represents page object of currently handled tab.
 * @param optionName Name of an element from navigation menu.
 * @returns {Promise<void>} Clicks and navigates us to chosen element.
 */
const clickNavigationOption = async(page, optionName) => {
    let optionElement;

    switch (optionName) {
        case "Address Book":
            optionElement = await page.waitForXPath(SELECTORS.NAVIGATION_OPTIONS.ADRESS_BOOK, {
                visible: true,
                timeout: COMMON_TIMEOUT
            });
            break;
        case "Newsletter Subscriptions":
            optionElement = await page.waitForXPath(SELECTORS.NAVIGATION_OPTIONS.NEWSLETTER_SUBSCRIPTION, {
                visible: true,
                timeout: COMMON_TIMEOUT
            });
            break;
    }

    await optionElement.click();
    await page.waitForNavigation({timeout: COMMON_TIMEOUT, waitUntil: 'networkidle2'})
};

/**
 * Adds new address to address book.
 * @param page Represents page object of currently handled tab.
 * @returns {Promise<void>} Clicks a button that adds new address.
 */
const clickAddNewAddress = async (page) => {
        const optionElement = await page.waitForXPath(SELECTORS.NAVIGATION_OPTIONS.ADD_NEW_ADRESS, {
            visible: true,
            timeout: COMMON_TIMEOUT
        });
        await optionElement.click();
};

/**
 * Adds first name to first name bracket.
 * @param page Represents page object of currently handled tab.
 * @param firstName Chosen First Name.
 * @returns {Promise<void>} Fills up First Name bracket with chosen First Name.
 */
const setFirstNameDetail = async (page, firstName) => {
    const firstNameInput = await page.waitForXPath(SELECTORS.ADDRESS_DETAILS.FIRSTNAME_INPUT);
    await firstNameInput.click({clickCount: 3})
    await firstNameInput.type(firstName);
};

/**
 * Set Last Name input field.
 * @param page Represents page object of currently handled tab.
 * @param lastName Chosen Last Name.
 * @returns {Promise<void>} Fills up Last Name bracket with chosen Last Name.
 */
const setLastNameDetail = async (page, lastName) => {
    const lastNameInput = await page.waitForXPath(SELECTORS.ADDRESS_DETAILS.LASTNAME_INPUT);
    await lastNameInput.click({clickCount: 3})
    await lastNameInput.type(lastName);
};

/**
 * Adds Phone Number to Phone Number bracket.
 * @param page Represents page object of currently handled tab.
 * @param phoneNumber Chosen Phone Number.
 * @returns {Promise<void>} Fills up Phone Number bracket with chosen Phone Number.
 */
const setPhoneNumberDetail = async (page, phoneNumber) => {
    const phoneNumberInput = await page.waitForXPath(SELECTORS.ADDRESS_DETAILS.PHONENUMBER_INPUT);
    await phoneNumberInput.click();
    await phoneNumberInput.type(phoneNumber);
};

/**
 * Adds Street Address to Street Address bracket.
 * @param page Represents page object of currently handled tab.
 * @param addressDetail Chosen Street Address.
 * @returns {Promise<void>} Fills up Street Address bracket with chosen Street Address.
 */
const setStreetAddressDetail = async (page, addressDetail) => {
    const streetAdressInput = await (page.waitForXPath(SELECTORS.ADDRESS_DETAILS.STREETADRESS_INPUT));
    await streetAdressInput.click();
    await streetAdressInput.type(addressDetail);
};

/**
 * Adds City to City bracket.
 * @param page Represents page object of currently handled tab.
 * @param cityDetail Chosen City.
 * @returns {Promise<void>} Fills up City bracket with chosen City.
 */
const setCityDetail = async (page, cityDetail = faker.address.city()) => {
    const cityInput = await (page.waitForXPath(SELECTORS.ADDRESS_DETAILS.CITY_INPUT));
    await cityInput.click();
    await cityInput.type(cityDetail);
};

/**
 * Adds Postal Code to Postal Code bracket.
 * @param page Represents page object of currently handled tab.
 * @param postalCode Chosen Postal Code.
 * @returns {Promise<void>} Fills up Postal Code bracket with chosen Postal Code.
 */
const setPostalCode = async(page, postalCode) => {
    const setPostalCode = await (page.waitForXPath(SELECTORS.ADDRESS_DETAILS.POSTALCODE_INPUT));
    await setPostalCode.click();
    await setPostalCode.type(postalCode);
};

/**
 * Chooses Country from available Countries.
 * @param page Represents page object of currently handled tab.
 * @param country_Id Id of chosen Country.
 * @returns {Promise<void>} Chosen Country from available Countries.
 */
const chooseCountry = async(page, country_Id) => {
    const countryDropDown = await (page.waitForXPath(SELECTORS.ADDRESS_DETAILS.COUNTRY_DROPDOWN));
    await countryDropDown.click();
    await page.waitForTimeout(1000);
    await countryDropDown.select(country_Id);
    await page.waitForTimeout(1000);
};

//TODO add faker to all functions which sets address details.
/**
 * Chooses Province from available Provinces.
 * @param page Represents page object of currently handled tab.
 * @param region_Id Id(number) of chosen Province.
 * @returns {Promise<void>} Chosen option from available Provinces.
 */
const chooseProvince = async (page, region_Id) => {
    const provinceDropDown = await (page.waitForXPath(SELECTORS.ADDRESS_DETAILS.STATEPROVINCE_DROPDOWN));
    await provinceDropDown.click();
    await page.waitForTimeout(1000);
    await provinceDropDown.select(region_Id);
    await page.waitForTimeout(1000);
};

/**
 * Saves entire Address.
 * @param page Represents page object of currently handled tab.
 * @param optionName Name of button that saves Address.
 * @returns {Promise<void>} Clicks Save Address button.
 */
const saveAddress = async (page, optionName) => {
    if (optionName === "Save Address") {
        const optionElement = await page.waitForXPath(SELECTORS.ADDRESS_DETAILS.SAVE_ADDRESS_BUTTON,  {
            visible: true,
            timeout: COMMON_TIMEOUT
    });
        await optionElement.click();
    }
};

/**
 * Gets received text from updating Newsletter.
 * @param page Represents page object of currently handled tab.
 * @returns {Promise<*>} Returns the received text.
 */
const getNewsletterDescriptionText = async (page) => {
    const newsletterDescription = await page.waitForXPath(SELECTORS.ACCOUNT_DETAILS.NEWSLETTER_DESCRIPTION, {visible: true, timeout: COMMON_TIMEOUT});

    return await getText(newsletterDescription);
};

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
    getNewsletterDescriptionText
};
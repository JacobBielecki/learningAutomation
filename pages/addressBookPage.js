const COMMON_TIMEOUT = global.__TIMEOUT__;
const {faker} = require('@faker-js/faker');
const regionNames = new Intl.DisplayNames(
    ['en'], {type: 'region'}
);
const {getText} = require("../utils/utils");

const SELECTORS = {
    ADD_NEW_ADRESS: "//button[@role='add-address']",
    DELETE_BUTTON: "//a[@class='action delete']",
    APPROVE_BUTTON: "//button[@class='action-primary action-accept']",
    DELETE_ADDRESS_CONFIRMATION_MESSAGE: "//div[@data-bind='html: $parent.prepareMessageForHtml(message.text)']",
    ADDRESS_DETAILS: {
        FIRSTNAME_INPUT: "//input[@id='firstname']",
        LASTNAME_INPUT: "//input[@id='lastname']",
        PHONE_NUMBER_INPUT: "//input[@id='telephone']",
        STREET_ADDRESS_INPUT: "//input[@name='street[]']",
        CITY_INPUT: "//input[@name='city']",
        STATEPROVINCE_DROPDOWN: "//select[@name='region_id']",
        POSTAL_CODE_INPUT: "//input[@name='postcode']",
        COUNTRY_DROPDOWN: "//select[@name='country_id']",
        SAVE_ADDRESS_BUTTON: "//button[@class='action save primary']",
        PROVINCE_CHECK_OPTION: "//option[@value='1']",
        COUNTRY_CHECK_OPTION: "//option[@value='US']",
        STATEPROVINCE_INPUT: "//input[@id='region']",
        PODKARPACKIE_ID: "//option[text()='podkarpackie']"
    },
    ADDITIONAL_ADDRESS_ENTRIES: "//tr[%n]//td[@data-th = '%s']",
};

/**
 * Adds new address to address book.
 * @param page Represents page object of currently handled tab.
 */
const clickAddNewAddress = async (page) => {
    const optionElement = await page.waitForXPath(SELECTORS.ADD_NEW_ADRESS, {
        visible: true,
        timeout: COMMON_TIMEOUT
    });
    await optionElement.click();
};

/**
 * Set First Name input field.
 * @param page Represents page object of currently handled tab.
 * @param firstName Chosen First Name.
 * @returns Chosen First Name.
 */
const setFirstNameDetail = async (page, firstName = faker.name.firstName('male')) => {
    const firstNameInput = await page.waitForXPath(SELECTORS.ADDRESS_DETAILS.FIRSTNAME_INPUT, {
        visible: true,
        timeout: COMMON_TIMEOUT
    });
    await firstNameInput.click({clickCount: 3})
    await firstNameInput.type(firstName);

    return firstName;
};

/**
 * Set Last Name input field.
 * @param page Represents page object of currently handled tab.
 * @param lastName Chosen Last Name.
 * @returns Chosen Last Name.
 */
const setLastNameDetail = async (page, lastName = faker.name.lastName('male')) => {
    const lastNameInput = await page.waitForXPath(SELECTORS.ADDRESS_DETAILS.LASTNAME_INPUT, {
        visible: true,
        timeout: COMMON_TIMEOUT
    });
    await lastNameInput.click({clickCount: 3})
    await lastNameInput.type(lastName);

    return lastName;
};

/**
 * Adds Phone Number to Phone Number bracket.
 * @param page Represents page object of currently handled tab.
 * @param phoneNumber Chosen Phone Number.
 * @returns Chosen Phone Number.
 */
const setPhoneNumberDetail = async (page, phoneNumber = faker.phone.number()) => {
    const phoneNumberInput = await page.waitForXPath(SELECTORS.ADDRESS_DETAILS.PHONE_NUMBER_INPUT, {
        visible: true,
        timeout: COMMON_TIMEOUT
    });
    await phoneNumberInput.click();
    await phoneNumberInput.type(phoneNumber);

    return phoneNumber;
};

/**
 * Adds Street Address to Street Address bracket.
 * @param page Represents page object of currently handled tab.
 * @param addressDetail Chosen Street Address.
 * @returns Name of the chosen Street Address.
 */
const setStreetAddressDetail = async (page, addressDetail = faker.address.streetAddress(true)) => {
    const streetAdressInput = await page.waitForXPath(SELECTORS.ADDRESS_DETAILS.STREET_ADDRESS_INPUT, {
        visible: true,
        timeout: COMMON_TIMEOUT
    });
    await streetAdressInput.click();
    await streetAdressInput.type(addressDetail);

    return addressDetail;
};

/**
 * Adds City to City bracket.
 * @param page Represents page object of currently handled tab.
 * @param cityDetail Chosen City.
 * @returns Name of the Chosen City.
 */
const setCityDetail = async (page, cityDetail = faker.address.city()) => {
    const cityInput = await page.waitForXPath(SELECTORS.ADDRESS_DETAILS.CITY_INPUT, {
        visible: true,
        timeout: COMMON_TIMEOUT
    });
    await cityInput.click();
    await cityInput.type(cityDetail);

    return cityDetail;
};

/**
 * Adds Postal Code to Postal Code bracket.
 * @param page Represents page object of currently handled tab.
 * @param postalCode Chosen Postal Code.
 * @returns Number of the chosen Postal Code.
 */
const setPostalCode = async(page, postalCode = faker.address.zipCode()) => {
    const setPostalCode = await page.waitForXPath(SELECTORS.ADDRESS_DETAILS.POSTAL_CODE_INPUT, {
        visible: true,
        timeout: COMMON_TIMEOUT
    });
    await setPostalCode.click();
    await setPostalCode.type(postalCode);

    return postalCode;
};

/**
 * Chooses Country from available Countries.
 * @param page Represents page object of currently handled tab.
 * @param countryId Id of chosen Country.
 * @returns Chosen Country from available Countries.
 */
const chooseCountry = async (page, countryId) => {
    const countryDropDown = await page.waitForXPath(SELECTORS.ADDRESS_DETAILS.COUNTRY_DROPDOWN, {
        visible: true,
        timeout: COMMON_TIMEOUT
    });
    await countryDropDown.click();
    await countryDropDown.select(countryId);

    return regionNames.of(countryId);
};

/**
 * Chooses Province from available Provinces.
 * @param page Represents page object of currently handled tab.
 * @param regionName Name of chosen Province.
 * @returns Chosen option from available Provinces.
 */
const chooseProvince = async (page, regionName) => {
    const provinceDropDown = await page.waitForXPath(SELECTORS.ADDRESS_DETAILS.STATEPROVINCE_DROPDOWN, {
        visible: true,
        timeout: 5000
    });
    await provinceDropDown.click();

    const province = await page.waitForXPath(SELECTORS.ADDRESS_DETAILS.PODKARPACKIE_ID, {
        timeout: COMMON_TIMEOUT
    });
    const provinceId = await (await province.getProperty('value')).jsonValue();
    await provinceDropDown.select(provinceId);

    return regionName;
};

/**
 * Saves entire Address.
 * @param page Represents page object of currently handled tab.
 */
const saveAddress = async (page) => {
        const saveAddressButton = await page.waitForXPath(SELECTORS.ADDRESS_DETAILS.SAVE_ADDRESS_BUTTON,  {
            visible: true,
            timeout: COMMON_TIMEOUT
        });
        await saveAddressButton.click();

        await page.waitForNavigation({
            timeout: COMMON_TIMEOUT,
            waitUntil: "networkidle2"
        });
};

/**
 * Checks if Address Details were filled correctly.
 * @param page Page object of currently handled tab.
 * @param rowNum Row number of Address record.
 * @param columnName Address column Name.
 * @returns element of Address Detail.
 */
const getAddressDetail = async (page, rowNum, columnName) => {
    return await page.waitForXPath((SELECTORS.ADDITIONAL_ADDRESS_ENTRIES.replace('%n', rowNum)).replace('%s', columnName), {
        visible: true,
        timeout: COMMON_TIMEOUT
    });
};

/**
 * It deletes saved address.
 * @param page Represents page object of currently handled tab.
 */
const deleteAddress = async (page) => {
    const optionElement = await page.waitForXPath(SELECTORS.DELETE_BUTTON,  {
            visible: true,
            timeout: COMMON_TIMEOUT
        });
        await optionElement.click();

    const approveButton = await page.waitForXPath(SELECTORS.APPROVE_BUTTON, {
        visible: true,
        timeout: COMMON_TIMEOUT
    });

    await approveButton.evaluate(b => b.click());
};

/**
 * Gets Confirmation Message about deleting address.
 * @param page Represents page object of currently handled tab.
 * @returns Confirmation Message text.
 */
const getConfirmationMessage = async (page) => {
    const confirmationMessage = await page.waitForXPath(SELECTORS.DELETE_ADDRESS_CONFIRMATION_MESSAGE, {
        visible: true,
        timeout: COMMON_TIMEOUT
    });
    return await getText(confirmationMessage);

};

module.exports = {
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
    deleteAddress,
    getConfirmationMessage,
    getAddressDetail
};
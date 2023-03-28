const COMMON_TIMEOUT = global.__TIMEOUT__;
const {faker} = require('@faker-js/faker');
const regionNames = new Intl.DisplayNames(
    ['en'], {type: 'region'}
);

const SELECTORS = {
    ADD_NEW_ADRESS: "//button[@role='add-address']",
    DELETE_BUTTON: "//a[@class='action delete']",
    APPROVE_BUTTON: "//button[@class='action-primary action-accept']",
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
    ADDITIONAL_ADDRESS_ENTRIES: {
        FIRST_NAME: "//tr[%s]//td[@data-th = 'First Name']",
        LAST_NAME: "//tr[%s]//td[@data-th = 'Last Name']",
        STREET_ADDRESS: "//tr[%s]//td[@data-th = 'Street Address']",
        CITY: "//tr[%s]//td[@data-th = 'City']",
        COUNTRY: "//tr[%s]//td[@data-th = 'Country']",
        STATE_PROVINCE: "//tr[%s]//td[@data-th = 'State']",
        POSTAL_CODE: "//tr[%s]//td[@data-th = 'Zip/Postal Code']",
        PHONE_NUMBER: "//tr[%s]//td[@data-th = 'Phone']"
    }
};

/**
 * Adds new address to address book.
 * @param page Represents page object of currently handled tab.
 * @returns {Promise<void>} Clicks a button that adds new address.
 */
const clickAddNewAddress = async (page) => {
    const optionElement = await page.waitForXPath(SELECTORS.ADD_NEW_ADRESS, {
        visible: true,
        timeout: COMMON_TIMEOUT
    });
    await optionElement.click();
};

/**
 * Adds first name to first name bracket.
 * @param page Represents page object of currently handled tab.
 * @param firstName Chosen First Name.
 * @returns {Promise<string>} Fills up First Name bracket with chosen First Name.
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
 * @returns {Promise<string>} Fills up Last Name bracket with chosen Last Name.
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
 * @returns {Promise<string>} Fills up Phone Number bracket with chosen Phone Number.
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
 * @returns {Promise<string>} Fills up Street Address bracket with chosen Street Address.
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
 * @returns {Promise<string>} Fills up City bracket with chosen City.
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
 * @returns {Promise<string>} Fills up Postal Code bracket with chosen Postal Code.
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
 * @returns {Promise<string>} Chosen Country from available Countries.
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
 * @returns {Promise<string>} Chosen option from available Provinces.
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
 * @returns {Promise<void>} Clicks Save Address button.
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
 * Checks if address got a First Name.
 * @param page Represents page object of currently handled tab.
 * @param rowNum Its the number of row.
 * @returns {Promise<*>} Gets First Name.
 */
const getFirstName = async (page, rowNum) => {
    return await page.waitForXPath(SELECTORS.ADDITIONAL_ADDRESS_ENTRIES.FIRST_NAME.replace('%s', rowNum), {
        visible:true,
        timeout: COMMON_TIMEOUT
    });
};

/**
 * Checks if address got a Last Name.
 * @param page Represents page object of currently handled tab.
 * @param rowNum Its the number of row.
 * @returns {Promise<*>} Gets Last Name.
 */
const getLastName = async (page, rowNum) => {
    return await page.waitForXPath(SELECTORS.ADDITIONAL_ADDRESS_ENTRIES.LAST_NAME.replace('%s', rowNum), {
        visible: true,
        timeout: COMMON_TIMEOUT
    });
};

/**
 * Checks if address got a Phone Number.
 * @param page Represents page object of currently handled tab.
 * @param rowNum Its the number of row.
 * @returns {Promise<*>} Gets Phone Number.
 */
const getPhoneNumber = async (page, rowNum) => {
    return await page.waitForXPath(SELECTORS.ADDITIONAL_ADDRESS_ENTRIES.PHONE_NUMBER.replace('%s', rowNum), {
        visible: true,
        timeout: COMMON_TIMEOUT
    });
};

/**
 * Checks if address got a Street Address.
 * @param page Represents page object of currently handled tab.
 * @param rowNum Its the number of row.
 * @returns {Promise<*>} Gets Street Address.
 */
const getStreetAddress = async (page, rowNum) => {
    return await page.waitForXPath(SELECTORS.ADDITIONAL_ADDRESS_ENTRIES.STREET_ADDRESS.replace('%s', rowNum), {
        visible: true,
        timeout: COMMON_TIMEOUT
    });
};

/**
 * Checks if address got a City.
 * @param page Represents page object of currently handled tab.
 * @param rowNum Its the number of row.
 * @returns {Promise<*>} Gets City.
 */
const getCity = async (page, rowNum) => {
    return await page.waitForXPath(SELECTORS.ADDITIONAL_ADDRESS_ENTRIES.CITY.replace('%s', rowNum), {
        visible: true,
        timeout: COMMON_TIMEOUT
    });
};

/**
 * Checks if address got a Postal Code.
 * @param page Represents page object of currently handled tab.
 * @param rowNum Its the number of row.
 * @returns {Promise<*>} Gets Postal Code.
 */
const getPostalCode = async (page, rowNum) => {
    return await page.waitForXPath(SELECTORS.ADDITIONAL_ADDRESS_ENTRIES.POSTAL_CODE.replace('%s', rowNum), {
        visible: true,
        timeout: COMMON_TIMEOUT
    });
};

/**
 * Checks if address got a Country.
 * @param page Represents page object of currently handled tab.
 * @param rowNum Its the number of row.
 * @returns {Promise<*>} Gets Country.
 */
const getCountry = async (page, rowNum) => {
    return await page.waitForXPath(SELECTORS.ADDITIONAL_ADDRESS_ENTRIES.COUNTRY.replace('%s', rowNum), {
        visible: true,
        timeout: COMMON_TIMEOUT
    });
};

/**
 * Checks if address got a Province.
 * @param page Represents page object of currently handled tab.
 * @param rowNum Its the number of row.
 * @returns {Promise<*>} Gets Province.
 */
const getProvince = async (page, rowNum) => {
    return await page.waitForXPath(SELECTORS.ADDITIONAL_ADDRESS_ENTRIES.STATE_PROVINCE.replace('%s', rowNum), {
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

module.exports = {
    clickAddNewAddress,
    setFirstNameDetail,
    getFirstName,
    setLastNameDetail,
    getLastName,
    setPhoneNumberDetail,
    getPhoneNumber,
    setStreetAddressDetail,
    getStreetAddress,
    setCityDetail,
    getCity,
    setPostalCode,
    getPostalCode,
    chooseCountry,
    getCountry,
    chooseProvince,
    getProvince,
    saveAddress,
    deleteAddress
};
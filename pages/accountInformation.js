const {faker} = require("@faker-js/faker");
const COMMON_TIMEOUT = global.__TIMEOUT__;
const SELECTORS = {
    FIRST_NAME_INPUT: "//input[@id='firstname']",
    LAST_NAME_INPUT: "//input[@id='lastname']",
    SAVE_BUTTON: "//button[@class='action save primary']",
};

/**
 * Set First Name input field.
 * @param page Represents page object of currently handled tab.
 * @param firstName Chosen First Name.
 * @returns Chosen First Name.
 */
const setFirstName = async (page, firstName = faker.name.firstName('male')) => {
    const firstNameInput = await page.waitForXPath(SELECTORS.FIRST_NAME_INPUT, {
        visible:true,
        timeout:COMMON_TIMEOUT
    });
    await firstNameInput.click({clickCount: 3});
    await firstNameInput.type(firstName);

    return firstName
};

/**
 * Set Last Name input field.
 * @param page Represents page object of currently handled tab.
 * @param lastName Chosen Last Name.
 * @returns Chosen Last Name.
 */
const setLastName = async(page, lastName = faker.name.lastName('male')) => {
    const lastNameInput = await page.waitForXPath(SELECTORS.LAST_NAME_INPUT, {
        visible:true,
        timeout:COMMON_TIMEOUT
    });
    await lastNameInput.click({clickCount: 3});
    await lastNameInput.type(lastName);

    return lastName
};

/**
 * Saves Account Information.
 * @param page Represents page object of currently handled tab.
 */
const saveAccountInformation = async(page) => {
    const saveButton = await page.waitForXPath(SELECTORS.SAVE_BUTTON, {
        visible:true,
        timeout:COMMON_TIMEOUT
    });
    await saveButton.click();
};

module.exports = {
    setFirstName,
    setLastName,
    saveAccountInformation
};
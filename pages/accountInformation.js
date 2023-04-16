const {faker} = require("@faker-js/faker");
const COMMON_TIMEOUT = global.__TIMEOUT__;


const SELECTORS = {
    FIRST_NAME_INPUT: "//input[@id='firstname']",
    LAST_NAME_INPUT: "//input[@id='lastname']",
    SAVE_BUTTON: "//button[@class='action save primary']",
};

const firstNameInput = async (page, firstName = faker.name.firstName('male')) => {
    const firstNameInput = await page.waitForXPath(SELECTORS.FIRST_NAME_INPUT, {
        visible:true,
        timeout:COMMON_TIMEOUT
    });
    await firstNameInput.click({clickCount: 3});
    await firstNameInput.type(firstName);

    return firstName
};

const lastNameInput = async(page, lastName = faker.name.lastName('male')) => {
    const lastNameInput = await page.waitForXPath(SELECTORS.LAST_NAME_INPUT, {
        visible:true,
        timeout:COMMON_TIMEOUT
    });
    await lastNameInput.click({clickCount: 3});
    await lastNameInput.type(lastName);

    return lastName
};

const saveAccountInformation = async(page) => {
    const saveButton = await page.waitForXPath(SELECTORS.SAVE_BUTTON, {
        visible:true,
        timeout:COMMON_TIMEOUT
    });
    await saveButton.click();
};

module.exports = {
    firstNameInput,
    lastNameInput,
    saveAccountInformation,
};
const COMMON_TIMEOUT = global.__TIMEOUT__;
const {getText} = require('../utils/utils');

const SELECTORS = {
    NAVIGATION_OPTIONS: {
        ADRESS_BOOK: "//a[text()='Address Book']",
        NEWSLETTER_SUBSCRIPTION: "//a[text()='Newsletter Subscriptions']",
        ACCOUNT_INFORMATION: "//a[text()='Account Information']"
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
        NEWSLETTER_DESCRIPTION: "//div[contains(@class, 'box-newsletter')]//p",
        ACCOUNT_INFORMATION_DESCRIPTION: "//div[text()='You saved the account information.']"
    },
    ACCOUNT_INFORMATION: "//div[@class='box box-information']//div//p"
};

/**
 * Clicks option from navigation menu.
 * @param page Represents page object of currently handled tab.
 * @param optionName Name of an element from navigation menu.
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
        case "Account Information":
            optionElement = await page.waitForXPath(SELECTORS.NAVIGATION_OPTIONS.ACCOUNT_INFORMATION, {
                visible: true,
                timeout: COMMON_TIMEOUT
            });
            break;
    }

    await optionElement.click();
    await page.waitForNavigation({timeout: COMMON_TIMEOUT, waitUntil: 'networkidle2'})
};

/**
 * Gets received text from updating Newsletter.
 * @param page Represents page object of currently handled tab.
 * @returns {Promise<*>} Returns the received text.
 */
const getNewsletterDescriptionText = async (page) => {
    const newsletterDescription = await page.waitForXPath(SELECTORS.ACCOUNT_DETAILS.NEWSLETTER_DESCRIPTION, {
        visible: true,
        timeout: COMMON_TIMEOUT
    });

    return await getText(newsletterDescription);
};

const getAccountInformationText = async (page) => {
    const confirmationMessage = await page.waitForXPath(SELECTORS.ACCOUNT_DETAILS.ACCOUNT_INFORMATION_DESCRIPTION, {
        visible:true,
        timeout:COMMON_TIMEOUT
    });

    return await getText(confirmationMessage)
};

const getContactInformation = async (page) => {
    return await page.waitForXPath(SELECTORS.ACCOUNT_INFORMATION, {
        visible:true,
        timeout:COMMON_TIMEOUT
    });
};

module.exports = {
    clickNavigationOption,
    getNewsletterDescriptionText,
    getAccountInformationText,
    getContactInformation
};
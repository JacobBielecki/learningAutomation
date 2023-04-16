const COMMON_TIMEOUT = global.__TIMEOUT__;
const SELECTORS = {
    SUBSCRIPTION_BUTTON: "//input[@type = 'checkbox']",
    SAVE_BUTTON: "//button[@title='Save']"
};

/**
 * Clicks General Subscription button.
 * @param page Represents page object of currently handled tab.
 */
const clickGeneralSubscription = async (page) => {
    const optionElement = await page.waitForXPath(SELECTORS.SUBSCRIPTION_BUTTON, {
        visible: true,
        timeout: COMMON_TIMEOUT
    });
    await optionElement.click();
};

/**
 * Clicks Save button to save newsletter.
 * @param page Represents page object of currently handled tab.
 */
const clickSaveButton = async (page) => {
    const optionElement = await page.waitForXPath(SELECTORS.SAVE_BUTTON, {
        visible: true,
        timeout: COMMON_TIMEOUT
    });
    await optionElement.click();
};

module.exports = {
    clickGeneralSubscription,
    clickSaveButton
};
const COMMON_TIMEOUT = global.__TIMEOUT__;
const SELECTORS = {
    SUBSCRIPTION_BUTTON: "//input[@type = 'checkbox']",
    SAVE_BUTTON: "//button[@title='Save']"
};

const clickGeneralSubscription = async (page) => {
    const optionElement = await page.waitForXPath(SELECTORS.SUBSCRIPTION_BUTTON, {
        visible: true,
        timeout: COMMON_TIMEOUT
    });
    await optionElement.click();
};

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
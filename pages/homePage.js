const COMMON_TIMEOUT = global.__TIMEOUT__;

const SELECTORS = {
    HOME_PAGE_BUTTON: "//a[@class='logo']"
};

const clickHomePage = async (page) => {
    const element = await page.waitForXPath(SELECTORS.HOME_PAGE_BUTTON, {visible: true, timeout: COMMON_TIMEOUT});
    await element.click();

    await page.waitForNavigation();
};

module.exports = {
    clickHomePage
};
const COMMON_TIMEOUT = global.__TIMEOUT__;

const SELECTORS = {
    HOME_PAGE_BUTTON: "//a[@class='logo']",
    MEN_PAGE_BUTTON: "//a[@href='https://magento.softwaretestingboard.com/men.html']"
};

/**
 * Navigates us to Home Page.
 * @param page Represents page object of currently handled tab.
 */
const clickHomePage = async (page) => {
    const element = await page.waitForXPath(SELECTORS.HOME_PAGE_BUTTON, {
        visible: true,
        timeout: COMMON_TIMEOUT
    });
    await element.click();

    await page.waitForNavigation();
};

/**
 * Navigates us to Men Page.
 * @param page Represents page object of currently handled tab.
 */
const clickMenPage = async (page) => {
    const element = await page.waitForXPath(SELECTORS.MEN_PAGE_BUTTON, {
        visible: true,
        timeout: COMMON_TIMEOUT
    });
    await element.click();

    await page.waitForNavigation()
};

module.exports = {
    clickHomePage,
    clickMenPage
};
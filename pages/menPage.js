const COMMON_TIMEOUT = global.__TIMEOUT__;

const SELECTORS = {
    TEES_BUTTON: "//li[@class='item']//a[@href='https://magento.softwaretestingboard.com/men/tops-men/tees-men.html']",
    CHOSEN_TEES: "//img[@alt='Strike Endurance Tee']",
    ADD_TO_WISHLIST: "//a[@data-action='add-to-wishlist']"
};

/**
 * It navigates us to tees page.
 * @param page Represents page object of currently handled tab.
 */
const clickTeesButton = async (page) => {
    const button = await page.waitForXPath(SELECTORS.TEES_BUTTON, {
        visible: true,
        timeout: COMMON_TIMEOUT
    });
    await button.click();

    await page.waitForNavigation();
};

/**
 * Click chosen tees.
 * @param page Represents page object of currently handled tab.
 */
const clickChosenTees = async (page) => {
    const element = await page.waitForXPath(SELECTORS.CHOSEN_TEES, {
        visible: true,
        timeout: COMMON_TIMEOUT
    });
    await element.click();

    await page.waitForNavigation();
};

/**
 * Adds chosen item to wish list.
 * @param page Represents page object of currently handled tab.
 */
const addToWishList = async (page) => {
    const button = await page.waitForXPath(SELECTORS.ADD_TO_WISHLIST, {
        visible: true,
        timeout: COMMON_TIMEOUT
    });
    await button.click();

    await page.waitForNavigation();
};


module.exports = {
    clickTeesButton,
    clickChosenTees,
    addToWishList
};
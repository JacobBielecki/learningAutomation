const COMMON_TIMEOUT = global.__TIMEOUT__;
const {getText} = require('../utils/utils');

const SELECTORS = {
    WISH_LIST_DESCRIPTION: "//div[@data-bind='html: $parent.prepareMessageForHtml(message.text)']",
    DELETE_BUTTON: "//a[@title='Remove This Item']",

};

/**
 * Gets received text from adding item to Wish List.
 * @param page Represents page object of currently handled tab.
 * @returns Text from adding or deleting item from Wish List.
 */
const wishListConfirmationMessage = async (page) => {
    const wishListDescription = await page.waitForXPath(SELECTORS.WISH_LIST_DESCRIPTION, {
        visible: true,
        timeout: COMMON_TIMEOUT
    });

    return await getText(wishListDescription)
};

/**
 * Deletes product from Wish List.
 * @param page Represents page object of currently handled tab.
 */
const deleteProduct = async (page) => {
    const button = await page.waitForXPath(SELECTORS.DELETE_BUTTON, {
        visible: true,
        timeout: COMMON_TIMEOUT
    });
    await button.click();
};

module.exports = {
    wishListConfirmationMessage,
    deleteProduct
};

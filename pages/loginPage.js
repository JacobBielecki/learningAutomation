const COMMON_TIMEOUT = global.__TIMEOUT__;

const SELECTORS = {
    EMAIL_INPUT: "//input[@id='email']",
    PASSWORD_INPUT: "//input[@title='Password']",
    SIGN_IN_BUTTON: "//main//button[@id='send2']"
};

const login = async (page) => {
    await page.goto('https://magento.softwaretestingboard.com/customer/account/login');

    const emailInput = await page.waitForXPath(SELECTORS.EMAIL_INPUT, {visible: true, timeout: COMMON_TIMEOUT});
    await emailInput.type(process.env.LOGIN);

    const passwordInput = await page.waitForXPath(SELECTORS.PASSWORD_INPUT)
    await passwordInput.type(process.env.PASSWORD);

    const singInButton = await page.waitForXPath(SELECTORS.SIGN_IN_BUTTON)
    await singInButton.click();

    await page.waitForNavigation();
};

module.exports = {
    login
};

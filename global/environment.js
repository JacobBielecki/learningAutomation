const NodeEnvironment = require('jest-environment-node').TestEnvironment;
const puppeteer = require('puppeteer');

class PuppeteerEnvironment extends NodeEnvironment {
    // eslint-disable-next-line no-useless-constructor
    constructor(config) {
        super(config);
    }

    async setup() {
        await super.setup();
        const browser = await puppeteer.launch({
            headless: await this.isHeadless(),
            ignoreHTTPSErrors: true,
            args: [
                '--no-sandbox',
                '--disable-dev-shm-usage',
                '--start-maximized'
            ],
            defaultViewport: await this.viewport()
        });
        this.global.__BROWSER__ = browser;
        this.global.__PAGE__ = await browser.newPage();
        this.global.__TIMEOUT__ = 10000;
    }

    async isHeadless() {
        if (process.env.RUN_HEADLESS !== undefined) {
            return process.env.RUN_HEADLESS === 'true';
        }
        return true;
    }

    async teardown() {
        await super.teardown();
        if (this.global.__BROWSER__) {
            this.global.__BROWSER__.close();
        }
    }

    async viewport() {
        return (await this.isHeadless()) ? {width: 1680, height: 1050} : null;
    }
}

module.exports = PuppeteerEnvironment;
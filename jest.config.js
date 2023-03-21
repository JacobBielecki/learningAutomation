module.exports = {
    testEnvironment: './global/environment',
    preset: "jest-puppeteer",
    globalSetup: './global/setup',
    setupFilesAfterEnv: ['./global/setupFramework'],
    testRunner: 'jest-circus/runner'
}
const { expect, browser, $ } = require('@wdio/globals')

describe('Try to login without email test', () => {
    it('should try to login without email and fail', async () => {
        await browser.url(`http://localhost:5173/`)
        const loginButton = await $('#loginButton');
        await loginButton.click();
        const passwordInput = await $('#password');
        await passwordInput.waitForExist();
        expect(passwordInput).toBeDisplayed();
        await passwordInput.setValue('wdio');
        const submitLogin = await $('#submitLogin');
        await submitLogin.waitForExist();
        expect(submitLogin).toBeDisplayed();
        await submitLogin.click();
        const URL = await browser.getUrl();
        expect(URL).toBe('http://localhost:5173/login');
    })
})


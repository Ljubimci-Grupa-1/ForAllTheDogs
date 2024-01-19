const { expect, browser, $ } = require('@wdio/globals')

describe('Login test', () => {
    it('should login with valid credentials', async () => {
        await browser.url(`http://localhost:5173/`)
        const loginButton = await $('#loginButton');
        await loginButton.click();
        const emailInput = await $('#email');
        await emailInput.waitForExist();
        expect(emailInput).toBeDisplayed();
        await emailInput.setValue('wdioTest@test.com');
        const passwordInput = await $('#password');
        await passwordInput.waitForExist();
        expect(passwordInput).toBeDisplayed();
        await passwordInput.setValue('wdiooo');
        const submitLogin = await $('#submitLogin');
        await submitLogin.waitForExist();
        expect(submitLogin).toBeDisplayed();
        await submitLogin.click();
        const errorText = await $('#error');
        await errorText.waitForExist();
        expect(errorText).toBeDisplayed();
        const errorTextContent = await errorText.getText();
        expect(errorTextContent).toContain('Wrong credentials!');
    })
})


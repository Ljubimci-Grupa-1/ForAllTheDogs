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
        await passwordInput.setValue('wdio');
        const submitLogin = await $('#submitLogin');
        await submitLogin.waitForExist();
        expect(submitLogin).toBeDisplayed();
        await submitLogin.click();
        await browser.waitUntil(
            async () => (await browser.getUrl()) === 'http://localhost:5173/',
            {
                timeout: 5000,
                timeoutMsg: 'URL is not http://localhost:5173 after login',
            }
        );
        // Wait for the showUsername element to be available
        const showUsername = await $('#showUsername');
        await showUsername.waitForExist();
        // Get the text content of the showUsername element
        const usernameText = await showUsername.getText();
        // Assert that the username is Drizzy drake
        expect(usernameText).toContain('Hello, wdioTest');
    // Wait for the email input to be available

})
})


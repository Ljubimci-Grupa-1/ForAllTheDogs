const { expect, browser, $ } = require('@wdio/globals')

describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        //load main page
        await browser.url(`http://localhost:5173/`)
        //click on signup
        const signUpButton = await $('#signupButton');
        await signUpButton.waitForExist();
        expect(signUpButton).toBeDisplayed();
        await signUpButton.click();
        //find and input username
        const usernameInput = await $('[name="username"]');
        expect(usernameInput).toBeDisplayed();
        await usernameInput.setValue('wdioTest');
        //find and input email
        let emailInput = await $('[name="email"]');
        expect(emailInput).toBeDisplayed();
        await emailInput.setValue('wdioTest@test.com');
        // Wait for the email input to be available
        let passwordInput = await $('[name="password"]');
        await passwordInput.waitForExist();
        expect(passwordInput).toBeDisplayed();
        await passwordInput.setValue('wdio');
        let nameInput = await $('[name="name"]');
        await nameInput.waitForExist();
        expect(nameInput).toBeDisplayed();
        await nameInput.setValue('wdio');
        let telephoneInput = await $('[name="telephoneNumber"]');
        await telephoneInput.waitForExist();
        expect(telephoneInput).toBeDisplayed();
        await telephoneInput.setValue('999999999');
        let checkboxInput = await $('[type="checkbox"]');
        await checkboxInput.waitForExist();
        expect(checkboxInput).toBeDisplayed();
        await checkboxInput.click();
        await checkboxInput.click();
        let submitButton = await $('[type="submit"]');
        await submitButton.waitForExist();
        expect(submitButton).toBeDisplayed();
        await submitButton.click();
        // Wait for the email input to be available
        emailInput = await $('#email');
        await emailInput.waitForExist();
        expect(emailInput).toBeDisplayed();
        await emailInput.setValue('wdioTest@test.com');
        passwordInput = await $('#password');
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
        expect(usernameText).toContain('Hello, Drizzy Drake');
    })
})


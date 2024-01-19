const { expect, browser, $ } = require('@wdio/globals')

describe('Register username fail test', () => {
    it('should try to register without username', async () => {
        //load main page
        await browser.url(`http://localhost:5173/`);
        //click on signup
        const signUpButton = await $('#signupButton');
        await signUpButton.waitForExist();
        expect(signUpButton).toBeDisplayed();
        await signUpButton.click();
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
        // Check if the URL is "localhost:5173/login"
        const URL = await browser.getUrl();
        console.log(URL);
        expect(URL).toBe('http://localhost:5173/signup');
    })
})


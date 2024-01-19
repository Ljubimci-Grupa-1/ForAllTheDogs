const { expect, browser, $ } = require('@wdio/globals')

describe('LogOut test', () => {
    it('should logout', async () => {
        await browser.url(`http://localhost:5173/`);
        const signoutButton = await $('#signout');
        await signoutButton.click();
        const loginText = await $('#loginText');
        await loginText.waitForExist();
        expect(loginText).toBeDisplayed();
        const loginTextContent = await loginText.getText();
        expect(loginTextContent).toContain('Please login or signup');
        //fetch all posts
    })
})


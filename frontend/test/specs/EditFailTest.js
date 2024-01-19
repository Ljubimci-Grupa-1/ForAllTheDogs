const { expect, browser, $ } = require('@wdio/globals')

describe('Edit fail test', () => {
    it('should try to edit pet but fail', async () => {
        await browser.url(`http://localhost:5173/`);
        const moreButton = await $('#more');
        await moreButton.click();
        const updateButton = await $('#update');
        await updateButton.click();
        const deleteImageButton = await $('#deleteImage');
        await deleteImageButton.click();
        const submitUpdate = await $('#submit');
        await submitUpdate.waitForExist();
        expect(submitUpdate).toBeDisplayed();
        await submitUpdate.click();
        const errorMessage = await $('.error-message');
        await errorMessage.waitForExist();
        expect(errorMessage).toBeDisplayed();
        const errorMessageText = await errorMessage.getText();
        expect(errorMessageText).toContain('At least 1 image!');
        //fetch all posts
    })
})


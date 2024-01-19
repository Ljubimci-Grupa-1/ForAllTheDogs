const { expect, browser, $ } = require('@wdio/globals')

describe('Edit test', () => {
    it('should edit pet species successfully', async () => {
        await browser.url(`http://localhost:5173/`)
        const moreButton = await $('#more');
        await moreButton.click();
        const updateButton = await $('#update');
        await updateButton.click();
        await browser.pause(5000);
        const speciesInput = await $('#species2');
        await speciesInput.waitForExist();
        expect(speciesInput).toBeDisplayed();
        speciesInput.click();
        const species = await $$('.css-ve7okb-JoyOption-root')[1];
        await species.click();
        await browser.pause(3000);
        const submitUpdate = await $('#submit');
        await submitUpdate.waitForExist();
        expect(submitUpdate).toBeDisplayed();
        await submitUpdate.click();
        await browser.pause(3000);
        //fetch all posts
        const posts = await $$('.css-cde0c5-JoyCard-root');
        //check if the post is there
        const postsLen = posts.length;
        const post=posts[postsLen-1];
        const postText = await post.$('#petSpecies');
        const postTextContent = await postText.getText();
        expect(postTextContent).toContain('Papiga');
    })
})


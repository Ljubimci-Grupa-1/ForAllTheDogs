const { expect, browser, $ } = require('@wdio/globals')

describe('Delete test', () => {
    it('should delete post', async () => {
        await browser.url(`http://localhost:5173/`);
        const moreButton = await $('#more');
        await moreButton.click();
        const deleteButton = await $('#delete');
        await deleteButton.click();
        const allPosts = await $$('.css-cde0c5-JoyCard-root');
        let found = false;

        for (let i = 0; i < allPosts.length; i++) {
            const post = allPosts[i];
            try {
                const postText = await post.findElement('#petName');
                const postTextContent = await postText.getText();
                if (postTextContent.includes('WdioTest')) {
                    found = true;
                    break;
                }
            } catch (error) {
                console.warn('Stale element encountered:', error.message);
            }
        }

        expect(found).toBe(false);

        expect(found).toBe(false);
    })
})


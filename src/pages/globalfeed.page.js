export class GlobalFeedPage {
    constructor(page) {
        this.page = page;
        this.globalFeedPage = page.getByRole ('button', {name: 'Global Feed' });
        this.likeArticleButton = page.getByRole('button', { name: ' ( 0 )' });
        this.likedArticleCounter = page.getByRole('button', { name: '  ( 1 )' });
    };

    async likeArticle () {
        await this.likeArticleButton.first().click()
    }

    async open () {
        await this.globalFeedPage.click();
    };
}
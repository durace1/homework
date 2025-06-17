import { test, expect } from '@playwright/test';
import { UserBuilder } from '../src/helpers/builders/user.builder';
import { App } from '../src/pages/app.page'
import { ArticleBuilder } from '../src/helpers/builders/article.builder';

test ('Создание статьи', async ({page})=> {
    //Генерим пользователя
    const randomUser = new UserBuilder()
        .addEmail()
        .addPassword()
        .addUsername()
        .generate();

    //Регистрируемся
        let app = new App(page);
        await app.main.open();
        await app.main.goToSignup();
        await app.register.signup(randomUser);
        await expect(app.main.profileNameField).toContainText(randomUser.username);

    //Генерим статью
    const randomArticle = new ArticleBuilder()
        .generateArticleTitle()
        .generateArticleInfo()
        .generateArticleContent()
        .generateArticleTag()
        .generate();

    //Создаем статью
    await app.newArticle.open();
    await app.newArticle.newArticle(randomArticle);
    await app.newArticle.verifyArticleCreated();
})

test ('Поставить лайк статье', async ({page})=> {
    //Генерим пользователя
    const randomUser = new UserBuilder()
        .addEmail()
        .addPassword()
        .addUsername()
        .generate();

    //Регистрируемся
        let app = new App(page);
        await app.main.open();
        await app.main.goToSignup();
        await app.register.signup(randomUser);
        await expect(app.main.profileNameField).toContainText(randomUser.username);

    //Генерим статью
    const randomArticle = new ArticleBuilder()
        .generateArticleTitle()
        .generateArticleInfo()
        .generateArticleContent()
        .generateArticleTag()
        .generate();

    //Создаем статью
    await app.newArticle.open();
    await app.newArticle.newArticle(randomArticle);
    await app.newArticle.verifyArticleCreated();

    //Поставим лайк статье
    await app.main.open();
    await app.globalFeed.open();
    await app.globalFeed.likeArticle();
    await page.waitForTimeout(6000);
    await app.globalFeed.verifyArticleLiked();
})

test ('Отфильтровать статью по тегу из списка', async ({page})=> {
    //Генерим пользователя
    const randomUser = new UserBuilder()
        .addEmail()
        .addPassword()
        .addUsername()
        .generate();

    //Регистрируемся
        let app = new App(page);
        await app.main.open();
        await app.main.goToSignup();
        await app.register.signup(randomUser);
        await expect(app.main.profileNameField).toContainText(randomUser.username);

    //Фильтруемся по тегу справа
    const tagName = await app.main.firstTag.textContent();

    await app.main.tagFiltering();
    await expect(app.main.firstArticleTag).toContainText(tagName)
})
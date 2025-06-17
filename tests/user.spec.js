import { test, expect } from '@playwright/test';
import { UserBuilder } from '../src/helpers/builders/user.builder';
import { App } from '../src/pages/app.page'

test ('Возможность логаута пользователя', async ({page})=> {
    //Генерим пользователя
    const randomUser = new UserBuilder()
        .addEmail()
        .addPassword()
        .addUsername()
        .generate();

    let app = new App(page);
    //Регистрируемся
    await app.main.open();
    await app.main.goToSignup();
    await app.register.signup(randomUser);
    await expect(app.main.profileNameField).toContainText(randomUser.username);

    //Логаутимся
    await app.settings.clickLogoutButton();
    await app.main.verifyLoginLinkIsVisible();
})

test.only ('Смена пароля у пользователя', async ({page})=> {
    //Генерим пользователя
    const randomUser = new UserBuilder()
        .addEmail()
        .addPassword()
        .addUsername()
        .generate();
    // Пароль для проверки
    const newPassword = '1234567'

    let app = new App(page);
    //Регистрируемся
    await app.main.open();
    await app.main.goToSignup();
    await app.register.signup(randomUser);
    await expect(app.main.profileNameField).toContainText(randomUser.username);

    //Идем в настройки менять пароль
    await app.settings.open();
    await app.settings.changePassword({password: newPassword});
    await expect(app.settings.updateSettingsButton).toBeHidden()

    //Выходим (без таймаута некорректно происходит логаут)
    await page.waitForTimeout(6000);
    await app.settings.clickLogoutButton();

    //Пробуем зайти со старым паролем
    await app.main.open();
    await app.main.gotoLogin();
    await app.register.login(randomUser);
    await app.register.verifyLoginError();

    //Пробуем зайти с новым паролем
    await app.main.open();
    await app.main.gotoLogin();
    await app.register.login({
        email: randomUser.email,
        password: newPassword
    })
    await expect(app.main.profileNameField).toContainText(randomUser.username);
})


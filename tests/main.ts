import { Selector } from 'testcafe';
import { faker } from '@faker-js/faker';

import Models from './models/models'

fixture('Sauce Labs').page('https://www.saucedemo.com');

test('Sauce Labs purchase process', async t => {
    // await t.typeText('#user-name', "performance_glitch_user")
    // await t.typeText('#password', "secret_sauce")
    // await t.click('#login-button')

    await t.expect(Models.loginBtn.exists).ok();

    await Models.setUserName('performance_glitch_user')
    await Models.setPassword('secret_sauce')
    await Models.clickLoginBtn()

    await Models.checkProductPrice('Sauce Labs Fleece Jacket', '$49.99');

    let items = <any> await Models.addProuctsToCart(2);

    await t.wait(2000)

    await Models.clickCartBtn();

    let itemCheck = <any> await Models.verifyCartItems(items);

    await Models.checkoutProcess(itemCheck);

    // await t.debug()

})
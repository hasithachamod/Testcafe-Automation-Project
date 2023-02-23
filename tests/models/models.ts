import { Selector, t } from 'testcafe';
import { faker } from '@faker-js/faker';

class SauceLabsModels {
    userNameInput;
    passwordInput;
    loginBtn;
    constructor(){
        this.userNameInput = Selector('#user-name')
        this.passwordInput = Selector('#password')
        this.loginBtn = Selector('#login-button')
    }

    async setUserName(username){
        await t.typeText(this.userNameInput, username)
    }

    async setPassword(password){
        await t.typeText(this.passwordInput, password)
    }

    async clickLoginBtn(){
        await t.click('#login-button')
        await t.wait(2000)
    }

    async clickCartBtn(){
        await t.click('.shopping_cart_link')
        await t.wait(2000)
    }

    async clickCheckoutBtn(){
        await t.click('#checkout')
        await t.wait(2000)
    }

    async clickContinueBtn(){
        await t.click('#continue')
        await t.wait(2000)
    }

    async clickFinishBtn(){
        await t.click('#finish')
        await t.wait(2000)
    }

    async checkProductPrice(productName, productPrice){

        await t.expect(Selector('.inventory_item').exists).ok();
        let inventoryItemCount = await Selector('.inventory_item').count
    // console.log(inventoryItemCount)

        for(let i=0; i<await inventoryItemCount; i++){
            // console.log('before if condition')
            await t.expect(Selector('.inventory_item_description').exists).ok();
            let description =  <any> await Selector('.inventory_item_description').nth(i).innerText
            if(description.includes(productName)){
                // console.log('inside if condition')
                if(await Selector('.inventory_item_price').nth(i).innerText==productPrice){
                    console.log("Value captured")
                } else {
                    console.log("Value failed")
                }
            }
        }
    }

    async addProuctsToCart(numberOfProducts){

        await t.expect(Selector('.inventory_item_label').exists).ok();
        await t.expect(Selector('.inventory_item').find('button').exists).ok();
        let items = <any> [];

        do{
            let randomNum = Math.floor(Math.random() * 6)
            // console.log(randomNum)
            let itemTitle = await Selector('.inventory_item_label').find('a').nth(randomNum).innerText

            if(!items.includes(itemTitle)){
                await t.click(Selector('.inventory_item').find('button').nth(randomNum));
                await items.push(itemTitle)
            }
        }while(items.length<(numberOfProducts));

        console.log('items.length = ',items.length, ' numberOfProducts = ',numberOfProducts)

        return items;
    }

    async verifyCartItems(items){
        let cartItemCount = await Selector('.cart_item').count
        // console.log('cart items count ', cartItemCount)

        let itemCheck = false;

        for(let i=0; i<await cartItemCount; i++){
            let title =  <any> await Selector('.cart_item').find('.inventory_item_name').nth(i).innerText

            if(items.includes(title)){
                console.log('Item valid:', items.includes(title))
                itemCheck = true;
            } else {
                console.log('Item invalid:', items.includes(title))
                itemCheck = false;
            }
        }

        await console.log(items)
        return itemCheck;
    }

    async checkoutProcess(itemCheck){
        if (itemCheck){
            console.log('Items check: Passed')
            this.clickCheckoutBtn();
    
            await t.typeText('#first-name', faker.name.firstName())
            await t.typeText('#last-name', faker.name.lastName())
            await t.typeText('#postal-code', faker.address.zipCode('#####'))
    
            await t.wait(2000)
    
            this.clickContinueBtn();
            this.clickFinishBtn();
        } else {
            console.log('Items check: Failed')
            await t.debug()
        }
    }

}

export default new SauceLabsModels();

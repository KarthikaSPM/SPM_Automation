import { Given, When, Then } from '@cucumber/cucumber';

Given('I open {string} browser', async function (browser: string) {
    await this.webDriver.initialize(browser)
})

When('I navigate to {string}', async function (url: string) {
    await this.webDriver.browserEvent.navigateTo(url)
})

Then('I click on {string}', async function (objName: string) {
    await this.webDriver.click.on(objName)
})

Then('I enter {string} text in {string}', async function (text: string, objName: string) {
    await this.webDriver.sendKeys.text(objName, text)
})

Then('I press {string} key on {string}', async function (key: string, objName: string) {
    await this.webDriver.sendKeys.press(objName, key)
})

Then('I wait for {int} seconds', async function (seconds: number) {
    await this.webDriver.browserWait.forTimeOut(seconds * 1000)
})

Then('I add pen to the cart', async function () {
    await this.webDriver.browserEvent.navigateTo("https://ey.corpmerchandise.com")
    await this.webDriver.sendKeys.text("eystore.searchBox", "pen")
    await this.webDriver.sendKeys.press("eystore.searchBox", "Enter")
    await this.webDriver.click.on("eystore.mardi-pen")
    await this.webDriver.sendKeys.text("eystore.quantity", "1")
})


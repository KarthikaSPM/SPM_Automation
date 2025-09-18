import { Given, When, Then } from '@cucumber/cucumber';

Given('I open {string} browser', async function (browser: string) {
    await this.webDriver.initialize(browser)
})

Then('I close browser', async function(){
    await this.webDriver.browserEvent.driverClose();
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

Then('I verify element {string} should have text {string}', async function (locator: string, expectedText: string) {
    let present = true;
    await this.webDriver.assertion.checkElementText(locator, expectedText, present)
})

Then('I verify element {string} should not have text {string}', async function (locator: string, expectedText: string) {
    let present = false;
    await this.webDriver.assertion.checkElementText(locator, expectedText, present)
})

Then('I should see page title as {string}', async function (expectedTitle: string) {
    let present = true;
    await this.webDriver.assertion.checkTitle(expectedTitle, present)
})

Then('I should not see page title as {string}', async function (expectedTitle: string) {
    let present = false;
    await this.webDriver.assertion.checkTitle(expectedTitle, present)
})

Then('I should see {string} value for {string} as {string}', async function (attributeName: string, locator: string, expectedValue: string) {
    let present = true;
    await this.webDriver.assertion.checkAttributeText(locator, attributeName, expectedValue, present)
})

Then('I should not see {string} value for {string} as {string}', async function (attributeName: string, locator: string, expectedValue: string) {
    let present = false;
    await this.webDriver.assertion.checkAttributeText(locator, attributeName, expectedValue, present)
})




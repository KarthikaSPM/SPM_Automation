import { Given, When, Then } from '@cucumber/cucumber';


Given(/^I open "([^"]*)" browser$/, async function (browser: string) {
    await this.webDriver.initialize(browser)
})

Then(/^I close browser$/, async function(){
    await this.webDriver.browserEvent.driverClose();
})

When(/^I navigate to "([^"]*)"$/,{timeout:10000}, async function (url: string) {
    await this.webDriver.browserEvent.navigateTo(url)
})

Then(/^I click on "([^"]*)"$/, async function (objName: string) {
    await this.webDriver.click.on(objName)
})

Then(/^I enter "([^"]*)" text in "([^"]*)"$/, async function (text: string, objName: string) {
    await this.webDriver.sendKeys.text(objName, text)
})

Then(/^I press "([^"]*)" key on "([^"]*)"$/, async function (key: string, objName: string) {
    await this.webDriver.sendKeys.press(objName, key)
})

Then(/^I wait for "([^"]*)" seconds$/, async function (seconds: number) {
    await this.webDriver.browserWait.forTimeOut(seconds * 1000)
})

Then(/^I verify element "([^"]*)" should have text "([^"]*)" with (soft|hard) assert$/, { timeout: 30000 }, async function (locator: string, expectedText: string,assertType: string) {
    let present = true;
    const isSoft = assertType === "soft";
    await this.webDriver.assertion.checkElementText(locator, expectedText, present,isSoft)
})

Then(/^I verify element "([^"]*)" should not have text "([^"]*)" with (soft|hard) assert$/, async function (locator: string, expectedText: string,assertType: string) {
    let present = false;
    const isSoft = assertType === "soft";
    await this.webDriver.assertion.checkElementText(locator, expectedText, present,isSoft)
})

Then(/^I should see page title as "([^"]*)" with (soft|hard) assert$/, async function (expectedTitle: string,assertType: string) {
    let present = true;
    const isSoft = assertType === "soft";
    await this.webDriver.assertion.checkTitle(expectedTitle, present, isSoft,this.attach)
})

Then(/^I should not see page title as "([^"]*)" with (soft|hard) assert$/, async function (expectedTitle: string,assertType: string) {
    let present = false;
    const isSoft = assertType === "soft";
    await this.webDriver.assertion.checkTitle(expectedTitle, present, isSoft,this.attach)
})

Then(/^I should see "([^"]*)" value for "([^"]*)" as "([^"]*)" with (soft|hard) assert$/, async function (attributeName: string, locator: string, expectedValue: string, assertType: string) {
    let present = true;
    const isSoft = assertType === "soft";
    await this.webDriver.assertion.checkAttributeText(locator, attributeName, expectedValue, present, isSoft)
})

Then(/^I should not see "([^"]*)" value for "([^"]*)" as "([^"]*)" with (soft|hard) assert$/, async function (attributeName: string, locator: string, expectedValue: string, assertType: string) {
    let present = false;
    const isSoft = assertType === "soft";
    await this.webDriver.assertion.checkElementText(locator, attributeName, expectedValue, present,assertType)
})
Then(/^I verify element "([^"]*)" should have text "([^"]*)"$/, async function (locator: string, expectedText: string) {
    let present = true;
    await this.webDriver.assertion.checkElementText(locator, expectedText, present,false)
})

Then(/^I verify element "([^"]*)" should not have text "([^"]*)"$/, async function (locator: string, expectedText: string) {
    let present = false;
    await this.webDriver.assertion.checkElementText(locator, expectedText, present,false)
})

Then(/^I should see page title as "([^"]*)"$/, async function (expectedTitle: string) {
    let present = true;
    await this.webDriver.assertion.checkTitle(expectedTitle, present,false)
})

Then(/^I should not see page title as "([^"]*)"$/, async function (expectedTitle: string) {
    let present = false;
    await this.webDriver.assertion.checkTitle(expectedTitle, present,false)
})

Then(/^I should see "([^"]*)" value for "([^"]*)" as "([^"]*)"$/, async function (attributeName: string, locator: string, expectedValue: string) {
    let present = true;
    await this.webDriver.assertion.checkAttributeText(locator, attributeName, expectedValue, present,false)
})

Then(/^I should not see "([^"]*)" value for "([^"]*)" as "([^"]*)"$/, async function (attributeName: string, locator: string, expectedValue: string) {
    let present = false;
    await this.webDriver.assertion.checkAttributeText(locator, attributeName, expectedValue, present,false)
})




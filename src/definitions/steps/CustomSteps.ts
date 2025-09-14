import { Given, When, Then } from '@cucumber/cucumber';

Then('I add pen to the cart', async function () {
    await this.webDriver.browserEvent.navigateTo("https://ey.corpmerchandise.com")
    await this.webDriver.sendKeys.text("eystore.searchBox", "pen")
    await this.webDriver.sendKeys.press("eystore.searchBox", "Enter")
    await this.webDriver.click.on("eystore.mardi-pen")
    await this.webDriver.sendKeys.text("eystore.quantity", "1")
})
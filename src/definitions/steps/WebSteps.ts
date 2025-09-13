import { Given, When, Then } from '@cucumber/cucumber';
import { Waits } from '../../core/util/Waits';

Given('I open {string} browser', async function (browser: string) {
    await this.webDriver.initialize(browser)
})

When('I navigate to {string}', async function (url: string) {
    await this.webDriver.browserEvent.navigateTo(url)
})

Then('I click on search button', async function () {
    await this.webDriver.sendKeys.text('home.searchbox', 'Sathya Sai Baba')
    await Waits.sleep(2000); // Wait for 2 seconds
})


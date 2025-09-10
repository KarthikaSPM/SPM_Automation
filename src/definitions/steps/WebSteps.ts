import { Given, When, Then } from '@cucumber/cucumber';
import { Waits } from '../../core/util/Waits';

Given('I open {string} browser', async function (browser: string) {
    await this.driver.launchBrowser(browser)
})

When('I navigate to {string}', async function (url: string) {
    await this.driver.navigateTo(url)
})

Then('I click on search button', async function () {
    
    await Waits.sleep(2000); // Wait for 2 seconds
})


import { Given, When, Then, setWorldConstructor } from '@cucumber/cucumber';
import { Waits } from '../../core/util/Waits';

Given('I open {string} browser', async function (browser: string) {
    await this.driver.launchBrowser(browser)
})

When('I navigate to {string}', async function (url: string) {
    await this.driver.navigateTo(url)
})

Then('I click on search button', async function () {
    console.log(await this.pageObject.locators['youtube']['url']['value']);
    console.log(await this.pageObject.get('youtube.searchBox'));
    console.log(await this.pageObject.getValue('youtube.url'));
    //await Waits.sleep(5000); // Wait for 2 seconds
})


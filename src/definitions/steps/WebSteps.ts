import {Given, When, Then, setWorldConstructor} from '@cucumber/cucumber';
import { BaseSteps } from './BaseSteps';
import { Waits } from '../../core/util/Waits';

setWorldConstructor(BaseSteps);

Given('I open {string} browser', async function(browser: string) {
    await this.driver.launchBrowser(browser)
})

When('I navigate to {string}', async function(url: string) {
    await this.driver.navigateTo(url)
})

Then('I click on search button', async function() {
    await Waits.sleep(5000); // Wait for 2 seconds
})


import {Given, When, Then, setWorldConstructor} from '@cucumber/cucumber';
import { BaseSteps } from './BaseSteps';
import { Waits } from '../../core/util/Waits';
import { Constants } from '../../core/util/Constants';

setWorldConstructor(BaseSteps);

Given('I open {string} browser', async function(browser: string) {
    console.log("Launching")
    await this.driver.launchBrowser(browser)
    console.log(Constants.PROPERTIES['browser.headless'])
})

When('I navigate to {string}', async function(url: string) {
    await this.driver.navigateTo(url)
    console.log('navigating')
})

Then('I click on search button', async function() {
    await Waits.sleep(5000); // Wait for 2 seconds
    console.log("clicking")
})


import {Given, When, Then} from '@cucumber/cucumber';

Given('I open {string} browser', function(browser: string) {
    console.log("Opening")
})

When('I navigate to {string}', function(url: string) {
    console.log('navigating')
})

Then('I click on search button', function() {
    console.log("clicking")
})
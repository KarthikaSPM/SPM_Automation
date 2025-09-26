import { Given, When, Then } from '@cucumber/cucumber';



Then('I verify the text {string} should have text {string}', async function (objName: string,expectedvalue: string) {
    //await this.webDriver.click.on(objName)
     await this.webDriver.elementaction.checkElementText(objName,expectedvalue,true)
     console.log(await this.webDriver.elementgetter.getElementText(objName))
     await this.webDriver.elementgetter.getAttributeValue("testpage.startbtn","class")
})

Then('I enter the details in the Home Page',async function(){
    await this.webDriver.elementaction.fillText("testpage.name","Karthika")
    await this.webDriver.elementaction.fillText("testpage.email","Karthika@test.com")
    await this.webDriver.elementaction.fillText("testpage.phone","32412432523")
    await this.webDriver.elementaction.fillText("testpage.address","Test addresss")
    //await this.webDriver.radioButton.checkRadiobtnVal("//input[@value='<value>']","female")
   // await this.webDriver.checkbox.check("testpage.daycheck")
    await this.webDriver.dropdown.selectDropdownbyValue("testpage.country","Australia")
    await this.webDriver.dropdown.selectByIndex("testpage.country",2)
    await this.webDriver.dropdown.getSelectedOption("testpage.country")
    await this.webDriver.mousehover.hoverOverElement("testpage.pointme")
    //await this.webDriver.click.on("testpage.alert1")
    //await this.webDriver.alert.acceptAlert()
    //await this.webDriver.click.on("testpage.confirmalert")
    //await this.webDriver.alert.dismissAlert()
    await this.webDriver.click.on("testpage.btnnewtab")
    await this.webDriver.browserEvent.switchToNewTab();
    await this.webDriver.elementgetter.isElementPresent("testpage.op")
    await this.webDriver.browserEvent.switchToDefaultTab();

/* await this.webDriver.datepicker.selectDateWithNavigation(
    '#datepicker',             // openSelector
    '.ui-datepicker-title',              // displayedMonthSelector (e.g., shows "September 2025")
    '.ui-icon-circle-triangle-e',                // nextMonthSelector
    '.ui-icon-circle-triangle-w',                // prevMonthSelector
    '[data-date="{day}"]',            // daySelectorTemplate
    2023,                            // targetYear
    5,                               // targetMonth (September, 0-based)
    25                               // targetDay
)



await this.webDriver.datepicker.selectDateWithDropdown(
    '#txtDate',         // opens the calendar
    '.ui-datepicker-year',            // year selector
    '.ui-datepicker-month',           // month selector
    '[data-date="{day}"]',        // day selector template
    2024,                        // year
    4,                           // September (0-based index)
    23                           // day
) */

await this.webDriver.mousehover.dragAndDrop("testpage.dragin","testpage.dragto")
await this.webDriver.mousehover.scrollToElement("testpage.dynamiccontent")
console.log(await this.webDriver.dropdown.getAllOptions("testpage.country"))
await this.webDriver.mousehover.rightClickElement("testpage.country")
//await this.webDriver.elementaction.waitForElement("testpage.btnnewtab")

})
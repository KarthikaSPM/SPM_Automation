import {
    BeforeAll,
    Before,
    AfterStep,
    setWorldConstructor,
    Status,
    ITestCaseHookParameter,

} from "@cucumber/cucumber"
import { BaseSteps } from "../steps/BaseSteps" // Adjust the path if necessary
import { Constants } from "../../core/util/Constants"



setWorldConstructor(BaseSteps)
BeforeAll(async function () {
    //console.log('Starting test execution...')
})

Before(async function () {

})

AfterStep(async function (this: BaseSteps, scenario) {
    // Attach screenshot if stepwise enabled or on failure
    if (Constants.STEPWISE_SCREENSHOT || scenario.result?.status === Status.FAILED) {
        const screenshot = this.webDriver ? await this.webDriver.browserEvent?.takeScreenshot() : undefined;
        if (screenshot) {
            await this.attach(screenshot, 'image/png');
        }
    }
});







import { BeforeAll, Before, AfterStep, setWorldConstructor, Status } from "@cucumber/cucumber"
import { BaseSteps } from "../steps/BaseSteps" // Adjust the path if necessary
import { Constants } from "../../core/util/Constants"

setWorldConstructor(BaseSteps)

BeforeAll(async function () {
    //console.log('Starting test execution...')
})

Before(async function () {
    
})

AfterStep(async function (this: BaseSteps, scenario) {
    if (Constants.STEPWISE_SCREENSHOT || scenario.result?.status === Status.FAILED) {
        let screenshot = this.webDriver ? await this.webDriver.browserEvent?.takeScreenshot() : undefined;
        if (screenshot) {
            this.attach(screenshot, 'image/png');
        }
    }
})
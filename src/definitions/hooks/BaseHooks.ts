import { BeforeAll, Before, After, AfterStep, setWorldConstructor, Status } from "@cucumber/cucumber"
import { BaseSteps } from "../steps/BaseSteps" // Adjust the path if necessary
import { Constants } from "../../core/util/Constants"

setWorldConstructor(BaseSteps)

BeforeAll(async function () {
    console.log('Starting test execution...')
})

Before(async function () {
    await this.initialize()
})

AfterStep(async function (this: BaseSteps, scenario) {
    if (Constants.STEPWISE_SCREENSHOT || scenario.result?.status === Status.FAILED) {
        let screenshot = this.driver ? await this.driver.takeScreenshot() : undefined;
        if (screenshot) {
            this.attach(screenshot, 'image/png');
        }
    }
})
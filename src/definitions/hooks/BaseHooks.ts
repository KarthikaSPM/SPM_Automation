import { BeforeAll, Before, AfterStep, setWorldConstructor } from "@cucumber/cucumber"
import { BaseSteps } from "../steps/BaseSteps" // Adjust the path if necessary
import { ICreateAttachmentOptions } from "@cucumber/cucumber/lib/runtime/attachment_manager/index"

setWorldConstructor(BaseSteps)

BeforeAll(async function() {
    console.log('Starting test execution...')
})

Before(async function () {
    await this.initialize()
})

AfterStep(async function(this: BaseSteps, scenario) {
    let screenshot: ICreateAttachmentOptions = this.driver?.takeScreenshot()
    this.attach(screenshot,'image/png')
})
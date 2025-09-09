import { Before, setWorldConstructor } from "@cucumber/cucumber"
import { BaseSteps } from "../steps/BaseSteps" // Adjust the path if necessary

setWorldConstructor(BaseSteps)

Before(async function () {
    await this.initialize()
})
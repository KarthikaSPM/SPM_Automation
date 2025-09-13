
import { Driver } from "../base/Driver";

export class RadioButton {

    #driver: Driver

    constructor(driver: Driver) {
        this.#driver = driver
    }

    async check(locator: string) {
        let element = await this.#driver.getElement(locator)
        if (element) {
            await element.check()
        }
    }

}
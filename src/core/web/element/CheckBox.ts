
import { Driver } from "../base/Driver";

export class CheckBox {

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

    async uncheck(locator: string) {
        let element = await this.#driver.getElement(locator)
        if (element) {
            await element.uncheck()
        }
    }

    async toggle(locator: string) {
        let element = await this.#driver.getElement(locator)
        if (element?.isChecked()) {
            await element.uncheck()
        } else {
            await element?.check()
        }
    }

}

import { Driver } from "../base/Driver";

export class Click {

    #driver: Driver

    constructor(driver: Driver) {
        this.#driver = driver
    }

    async on(locator: string) {
        let element = await this.#driver.getElement(locator)
        if (element) {
            await element.click()
        }
    }

}
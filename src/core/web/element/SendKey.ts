
import { Driver } from "../base/Driver";

export class SendKey {

    #driver: Driver | null = null 

    constructor(driver: Driver) {
        this.#driver = driver
    }

    async text(locator: string, text: string) {
        let element = await this.#driver?.getElement(locator)
        if (element) {
            await element.fill(text)
        }
    }
}
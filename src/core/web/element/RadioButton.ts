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

    async checkRadiobtnVal(locator: string,value: string) {
            console.log("inside Radio")
            console.log(locator.replace("<value>",value))
            let element = await this.#driver.getElement(locator)

            if (element) {
            console.log("inside Radio")
                await element.check()
            }
        }



}
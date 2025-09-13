import { Driver } from "../base/Driver";

export class BrowserWait {

    #driver: Driver

    constructor(driver: Driver) {
        this.#driver = driver
    }

    async forTimeOut(millisecond: number) {
        await this.#driver.page?.waitForTimeout(millisecond);
    }

}
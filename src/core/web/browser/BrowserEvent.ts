import { Driver } from "../base/Driver";

export class BrowserEvent {

    #driver: Driver

    constructor(driver: Driver) {
        this.#driver = driver
    }

    async navigateTo(url: string) {
        if (!this.#driver?.page) {
            throw new Error('Browser is not launched. Call launchBrowser() first.')
        }
        await this.#driver.page.goto(url, { waitUntil: 'domcontentloaded' })
    }

    async takeScreenshot() {
        return await this.#driver.page?.screenshot()
    }

    async driverClose(){
        await this.#driver.closeBrowser();
    }



}
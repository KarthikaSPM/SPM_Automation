
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

    /**
         * Clicks on the element if it is visible.
         * Returns true if click was performed, false if element not found or not visible.
         * @param locator - The selector string to locate the element.
         * @returns Promise<boolean> indicating whether the click happened.
         */
        async clickIfVisible(locator: string): Promise<boolean> {
            const element = await this.#driver.getElement(locator);
            if (!element) return false;
            if (await element.isVisible()) {
                await element.click();
                return true;
            }
            return false;
        }

}
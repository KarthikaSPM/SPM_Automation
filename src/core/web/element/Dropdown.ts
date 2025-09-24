
import { Driver } from "../base/Driver";

export class Dropdown {

    #driver: Driver

    constructor(driver: Driver) {
        this.#driver = driver
    }


 async selectDropdown(locator: string, option: string): Promise<void> {

    const element = await this.#driver.getElement(locator);
  if (!element) {
    throw new Error(`Element not found for locator: ${locator}`);
  }
  await element.selectOption(option);


}


}
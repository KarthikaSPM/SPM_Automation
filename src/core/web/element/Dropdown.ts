
import { Driver } from "../base/Driver";

export class Dropdown {

    #driver: Driver

    constructor(driver: Driver) {
        this.#driver = driver
    }


 async selectDropdownbyValue(locator: string, option: string): Promise<void> {

  const element = await this.#driver.getElement(locator);
  if (!element) {
    throw new Error(`Element not found for locator: ${locator}`);
  }
  await element.selectOption(option);


}


 /**
   * Selects an option by visible text
   */
  async selectByText(selector: string, visibleText: string): Promise<void> {
    const element = await this.#driver.getElement(selector);
      if (!element) {
        throw new Error(`Element not found for locator: ${selector}`);
      }
    await element.selectOption({ label: visibleText });
  }



    async selectByIndex(selector: string, index: number): Promise<void> {

        const dropdown = await this.#driver.getElement(selector);
        if (!dropdown) {
          throw new Error(`Element not found for locator: ${selector}`);
        }

        const options = await dropdown.locator('option').all();
        const option = options[index];

        if (!option) {
          throw new Error(`No option found at index ${index} for selector: ${selector}`);
        }

        const value = await option.getAttribute('value');
        if (!value) {
          throw new Error(`Option at index ${index} does not have a 'value' attribute.`);
        }

        await dropdown.selectOption(value);

    }


/**
   * Gets selected option text
   */
  async getSelectedOption(selector: string): Promise<string | null> {
    const dropdown = await this.#driver.getElement(selector);
            if (!dropdown) {
              throw new Error(`Element not found for locator: ${selector}`);
            }
    const selected = dropdown.locator('option:checked');
    console.log(await selected.textContent())
    return await selected.textContent();
  }


/**
   * Gets all option texts
   */
  async getAllOptions(selector: string): Promise<string[]> {
    const dropdown = await this.#driver.getElement(selector);
                if (!dropdown) {
                  throw new Error(`Element not found for locator: ${selector}`);
                }
    const options = await dropdown.locator('option').all();
    const texts = await Promise.all(options.map(option => option.textContent()));
    return texts.filter(text => text !== null) as string[];
  }






}
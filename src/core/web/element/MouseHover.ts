import { Driver } from "../base/Driver";

export class MouseHover {

    #driver: Driver

    constructor(driver: Driver) {
        this.#driver = driver
    }


async hoverOverElement(selector: string): Promise<void> {

  const element = await this.#driver.getElement(selector);
  if (!element) {
    throw new Error(`Element not found for locator: ${selector}`);
  }
  await element.hover();

}



async dragAndDrop(sourceSelector: string, targetSelector: string) {
    if (!this.#driver?.page) {
        throw new Error('Page is not available.');
    }

    const page = this.#driver?.page;

    const source = await this.#driver.getElement(sourceSelector);
    const target = await this.#driver.getElement(targetSelector);

    if (!source) {
        throw new Error(`Source element not found for selector: ${sourceSelector}`);
    }
    if (!target) {
        throw new Error(`Target element not found for selector: ${targetSelector}`);
    }

    // Ensure both elements are visible
    await source.waitFor({ state: 'visible' });
    await target.waitFor({ state: 'visible' });

    // Perform drag and drop
    await source.dragTo(target);
}


/**
 * Scrolls to an element on the page using Playwright.
 * @param selector - CSS selector of the element to scroll to.
 */
async scrollToElement(selector: string) {
    if (!this.#driver?.page) {
        throw new Error('Page is not available.');
    }

    const element = await this.#driver.getElement(selector);


        if (!element) {
            throw new Error(`Source element not found for selector: ${selector}`);
            }
    // Wait for the element to be attached and visible
    await element.waitFor({ state: 'visible' });

    // Scroll into view
    await element.scrollIntoViewIfNeeded();

}


   async rightClickElement(selector: string): Promise<void> {
     if (!this.#driver?.page) {
           throw new Error('Page is not available.');
       }
  const element = await this.#driver.getElement(selector);
   if (!element) {
              throw new Error(`Source element not found for selector: ${selector}`);
              }
  await element.waitFor({ state: 'visible', timeout: 5000 });
  await element.click({ button: 'right' });
}



}
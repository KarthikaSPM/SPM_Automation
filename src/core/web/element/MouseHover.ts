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

    const source = page.locator(sourceSelector);
    const target = page.locator(targetSelector);

    // Ensure both elements are visible
    await source.waitFor({ state: 'visible' });
    await target.waitFor({ state: 'visible' });

    // Perform drag and drop
    await source.dragTo(target);
}


}
import { Driver } from "../base/Driver";
import { expect } from 'chai';

class NoStackError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NoStackError';

    // ✅ Safely remove the stack trace
    Object.defineProperty(this, 'stack', {
      value: undefined,
      writable: true,
      configurable: true,
      enumerable: false,
    });
  }
}


export class ElementAction {

     #driver: Driver

     constructor(driver: Driver) {
         this.#driver = driver
     }

 async fillText(selector: string,value: string): Promise<void> {

   const element = await this.#driver.getElement(selector);
   if (!element) {
     throw new Error(`Element not found for locator: ${selector}`);
   }
   await element.fill(String(value));

 }

async verifyElementText(selector: string, expectedText: string) {
  //await expect(page.locator(selector)).toHaveText(expectedText);
   const element = await this.#driver.getElement(selector);
     if (!element) {
       throw new Error(`Element not found for locator: ${selector}`);
     }
     await expect(element).to.equal(expectedText);

}

async checkElementText(locator:string, expectedValue: string,present: boolean) {

   let element = await this.#driver.getElement(locator)

    if (!element) {
    throw new Error(`Element not found for locator: ${locator}`);
   }

   let actualValue = (await element.innerText()).trim();

    if (present) {
      if (actualValue !== expectedValue) {
        throw new NoStackError(
          `Attribute value not matched.\nExpected: ${expectedValue}\nActual: ${actualValue}`
        );
      } else {
        console.log(`Attribute matched: "${actualValue}" = "${expectedValue}"`);
      }
    } else {
      if (actualValue === expectedValue) {
        throw new NoStackError(
          'Attribute value matched (but expected not to).\nExpected NOT: ${expectedValue}\nActual: ${actualValue}'
        );
      } else {
        console.log(`Attribute does not match "${expectedValue}"`);
      }
    }
  }


}
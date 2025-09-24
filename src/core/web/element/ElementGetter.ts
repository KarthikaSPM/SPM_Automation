import { Driver } from "../base/Driver";

export class ElementGetter {

    #driver: Driver

    constructor(driver: Driver) {
        this.#driver = driver
    }

/* async getElementAttribute(selector: string,attributeName: string): Promise<string> {

  const element = await this.#driver.getElement(selector);
  if (!element) {
    throw new Error(`Element not found for locator: ${selector}`);
  }
  let attrVal= await(element.getAttribute(attributeName))
  console.log(attrVal)
  return attrVal

} */

  async getAttributeValue(locator:string,attribute_name:string):Promise<string> {

  let element = await this.#driver.getElement(locator)

    if (!element) {
    throw new Error(`Element not found for locator: ${locator}`);
   }

   let actualValue = await element.getAttribute(attribute_name)

    if (actualValue === null) {
    throw new Error(`Attribute "${attribute_name}" not found on element with locator: ${locator}`);
  }

   return actualValue

  }


async getElementText(locator:string): Promise<string>  {

   let element = await this.#driver.getElement(locator)

    if (!element) {
    throw new Error(`Element not found for locator: ${locator}`);
   }

   let actualValue = (await element.innerText()).trim();
   console.log(actualValue)
   return actualValue

  }




async isElementPresent(selector: string): Promise<boolean> {
  //const count = await page.locator(selector).count();

const element = await this.#driver.getElement(selector);
const count = element ? await element.count() : 0;
console.log(count)
  return count > 0;
}


}
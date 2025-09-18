import { Driver } from "../base/Driver";


class NoStackError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'NoStackError';
        Object.defineProperty(this, 'stack', {
            value: undefined,
            writable: true,
            configurable: true,
            enumerable: false,
        });
    }
}

export class Assertion {

    #driver: Driver

    constructor(driver: Driver) {
        this.#driver = driver
    }

    async checkElementText(locator: string, expectedElementText: string, present: boolean) {

        let element = await this.#driver.getElement(locator)

        if (!element) {
            throw new Error(`Element not found for locator: ${locator}`);
        }

        let actualElementText = (await element.innerText()).trim();

        if (present) {
            if (actualElementText !== expectedElementText) {
                throw new NoStackError(
                    `Element text not matched.\nExpected: ${expectedElementText}\nActual: ${actualElementText}`
                );
            } else {
                console.log(`Element text matched: "${actualElementText}" = "${expectedElementText}"`);
            }
        } else {
            if (actualElementText === expectedElementText) {
                throw new NoStackError(
                    'Element text matched (but expected not to).\nExpected NOT: ${expectedValue}\nActual: ${actualValue}'
                );
            } else {
                console.log(`Element text does not match "${expectedElementText}"`);
            }
        }
    }

    async checkTitle(expectedTitle: string, present: boolean) {
        const page = this.#driver.page;
        if (!page) {
            throw new Error("Page is not initialized.");
        }
        let actualTitle = await page.title();
        if (present) {
            if (actualTitle !== expectedTitle) {
                throw new NoStackError(
                    `Page Title Not Matched:\nExpected Page Title: ${expectedTitle}\nActual Page Title: ${actualTitle}`
                );
            } else {
                console.log(`Page title matched: "${actualTitle}"`);
            }
        } else {
            if (actualTitle === expectedTitle) {
                throw new NoStackError(
                    `Page Title Matched (but expected not to).\nExpected NOT: ${expectedTitle}\nActual: ${actualTitle}`);
            } else {
                console.log(`Page Title does not match "${expectedTitle}"`);
            }
        }
    }


    async getAttributeValue(locator: string, attributeName: string): Promise<string> {

        let element = await this.#driver.getElement(locator)

        if (!element) {
            throw new Error(`Element not found for locator: ${locator}`);
        }

        let attribute_value = await element.getAttribute(attributeName)

        if (attribute_value === null) {
            throw new Error(`Attribute "${attributeName}" not found on element with locator: ${locator}`);
        }

        return attribute_value

    }

    async checkAttributeText(locator: string, attributeName: string, expectedValue: string, present: boolean) {

        let actualAttributeValue = await this.getAttributeValue(locator, attributeName)

        if (present) {
            if (actualAttributeValue !== expectedValue) {
                throw new NoStackError(
                    `Attribute value not matched.\nExpected: ${expectedValue}\nActual: ${actualAttributeValue}`
                );
            } else {
                console.log(`Attribute matched: "${actualAttributeValue}" = "${expectedValue}"`);
            }
        } else {
            if (actualAttributeValue === expectedValue) {
                throw new NoStackError(
                    'Attribute value matched (but expected not to).\nExpected NOT: ${expectedValue}\nActual: ${actualValue}'
                );
            } else {
                console.log(`Attribute does not match "${expectedValue}"`);
            }
        }
    }











}
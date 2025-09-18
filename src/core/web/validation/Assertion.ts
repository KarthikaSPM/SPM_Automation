import {Driver} from "../base/Driver";
import logger from "../../util/Logger";


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
    private softAssertErrors: any;

    constructor(driver: Driver) {
        this.#driver = driver
    }

    async checkElementText(locator: string, expectedElementText: string, present: boolean, softAssert: boolean) {

        let element = await this.#driver.getElement(locator)

        if (!element) {
            throw new Error(`Element not found for locator: ${locator}`);
        }

        let actualElementText = (await element.innerText()).trim();
        let assertionFailed = false;
        let message = '';

        if (present) {
            if (actualElementText !== expectedElementText) {
                message = `Element text not matched.\nExpected: ${expectedElementText}\nActual: ${actualElementText}`
                assertionFailed = true;
            } else {
                if (actualElementText === expectedElementText) {
                    message = `Element text matched (but expected not to).\nExpected NOT: ${expectedElementText}\nActual: ${actualElementText}`
                }
            }
            if (assertionFailed) {
                if (softAssert) {
                    // console.error('[SOFT ASSERT]', message);
                    logger.error({ tag: 'SOFT ASSERT', error: message }, 'Soft assertion failed');
                    // Optional: push this error into a custom soft assertion collector
                    this.softAssertErrors = this.softAssertErrors || [];
                    this.softAssertErrors.push(message);
                } else {
                    throw new NoStackError(message); // or use NoStackError
                }
            } else {
                // console.log(`Element text check passed: "${actualElementText}"`);
                logger.info(`Element text check passed: "${actualElementText}"`);
            }
        }
    }

    // async checkTitle(expectedTitle: string, present: boolean) {
    //     const page = this.#driver.page;
    //     if (!page) {
    //         throw new Error("Page is not initialized.");
    //     }
    //     let actualTitle = await page.title();
    //     if (present) {
    //         if (actualTitle !== expectedTitle) {
    //             throw new NoStackError(
    //                 `Page Title Not Matched:\nExpected Page Title: ${expectedTitle}\nActual Page Title: ${actualTitle}`
    //             );
    //         } else {
    //             console.log(`Page title matched: "${actualTitle}"`);
    //         }
    //     } else {
    //         if (actualTitle === expectedTitle) {
    //             throw new NoStackError(
    //                 `Page Title Matched (but expected not to).\nExpected NOT: ${expectedTitle}\nActual: ${actualTitle}`);
    //         } else {
    //             console.log(`Page Title does not match "${expectedTitle}"`);
    //         }
    //     }
    // }


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

    async checkAttributeText(locator: string, attributeName: string, expectedValue: string, present: boolean, softAssert: boolean) {

        let actualAttributeValue = await this.getAttributeValue(locator, attributeName)

        let assertionFailed = false;
        let message = '';

        if (present) {
            if (actualAttributeValue !== expectedValue) {
                message = `Attribute value not matched.\nExpected: ${expectedValue}\nActual: ${actualAttributeValue}`
                assertionFailed = true

            } else {
                if (actualAttributeValue === expectedValue) {
                    message = 'Attribute value matched (but expected not to).\nExpected NOT: ${expectedValue}\nActual: ${actualValue}'
                    assertionFailed = true;
                }
            }

            if (assertionFailed) {
                if (softAssert) {
                    // console.error('[SOFT ASSERT]', message);
                    logger.error({ tag: 'SOFT ASSERT', error: message }, 'Soft assertion failed');
                    // Optional: push this error into a custom soft assertion collector
                    this.softAssertErrors = this.softAssertErrors || [];
                    this.softAssertErrors.push(message);
                } else {
                    throw new NoStackError(message); // or use NoStackError
                }
            } else {
                // console.log(`Attribute check passed: "${actualAttributeValue}"`);
                logger.info(`Attribute check passed: "${actualAttributeValue}"`);

            }
        }
    }

    async checkTitle(expectedTitle: string, present: boolean, softAssert: boolean) {
        const page = this.#driver.page;
        if (!page) {
            throw new Error("Page is not initialized.");
        }

        const actualTitle = await page.title();
        let assertionFailed = false;
        let message = '';

        if (present) {
            if (actualTitle !== expectedTitle) {
                message = `Page Title Mismatch:\nExpected: "${expectedTitle}"\nActual: "${actualTitle}"`;
                assertionFailed = true;
            }
        } else {
            if (actualTitle === expectedTitle) {
                message = `Page Title Unexpectedly Matches:\nExpected NOT: "${expectedTitle}"\nActual: "${actualTitle}"`;
                assertionFailed = true;
            }
        }

        if (assertionFailed) {
            if (softAssert) {
                // console.error('[SOFT ASSERT]', message);
                logger.error({ tag: 'SOFT ASSERT', error: message }, 'Soft assertion failed');
                // Optional: push this error into a custom soft assertion collector
                this.softAssertErrors = this.softAssertErrors || [];
                this.softAssertErrors.push(message);
            } else {
                // Hard assert — fail immediately
                throw new NoStackError(message); // or use NoStackError
            }
        } else {
            // console.log(`Page title check passed: "${actualTitle}"`);
            logger.info(`Page title check passed: "${actualTitle}"`);

        }
    }


}
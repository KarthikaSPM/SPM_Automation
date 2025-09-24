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



async switchToNewTab() {
    if (!this.#driver?.context) {
        throw new Error('Browser is not launched. Call launchBrowser() first.');
    }
    // Wait for a new page (tab) to be opened
    const [newPage] = await Promise.all([
        this.#driver.context.waitForEvent('page'),
        // You should trigger the action that opens the new tab here, e.g., clicking a link
    ]);
    // Optionally, wait for the new page to load
    await newPage.waitForLoadState('domcontentloaded');
    // Set the new page as the current page
    this.#driver.page = newPage;
}




async switchToDefaultTab() {
    if (!this.#driver?.context) {
        throw new Error('Browser context is not available.');
    }

    const pages = this.#driver.context.pages();
    const defaultPage = pages[0];

    if (!defaultPage) {
        throw new Error('No tabs are open.');
    }

    await defaultPage.bringToFront(); // Optional: brings the tab to the front in UI
    this.#driver.page = defaultPage;
}




}
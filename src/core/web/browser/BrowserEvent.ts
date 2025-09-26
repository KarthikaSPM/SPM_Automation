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

/**
     * Reloads the current page.
     * @throws Error if no page is available to reload.
     */
    async reloadPage(): Promise<void> {
        if (!this.#driver?.page) {
            throw new Error('No page available to reload');
        }
        await this.#driver.page.reload({ waitUntil: 'domcontentloaded' });
        logger.info('Page reloaded');
    }

    /**
         * Navigates back in browser history.
         * @throws Error if no page is available to navigate back.
         */
        async goBack(): Promise<void> {
            if (!this.#driver?.page) {
                throw new Error('No page available to go back');
            }
            await this.#driver.page.goBack({ waitUntil: 'domcontentloaded' });
            logger.info('Navigated back');
        }


    /**
         * Navigates forward in browser history.
         * @throws Error if no page is available to navigate forward.
         */
        async goForward(): Promise<void> {
            if (!this.#driver?.page) {
                throw new Error('No page available to go forward');
            }
            await this.#driver.page.goForward({ waitUntil: 'domcontentloaded' });
            logger.info('Navigated forward');
        }

      /**
          * Waits for an element matching the selector to appear on the page.
          * @param selector - CSS selector to wait for.
          * @param timeout - Maximum wait time in milliseconds (default 5000).
          * @throws Error if no page is available to wait on.
          */
         async waitForSelector(selector: string, timeout = 5000): Promise<void> {
             if (!this.#driver?.page) {
                 throw new Error('No page available to wait for selector');
             }
             await this.#driver.page.waitForSelector(selector, { timeout });
             logger.info(`Selector "${selector}" appeared on the page`);
         }

         /**
              * Handles the next browser dialog, either accepting or dismissing it.
              * @param accept - Whether to accept (true) or dismiss (false) the dialog. Defaults to true.
              * @throws Error if no page is available to handle dialog.
              */
             async handleDialog(accept = true): Promise<void> {
                 if (!this.#driver?.page) {
                     throw new Error('No page available to handle dialog');
                 }
                 await new Promise<void>((resolve) => {
                     this.#driver.page?.once('dialog', async (dialog) => {
                         logger.info(`Dialog message: ${dialog.message()}`);
                         if (accept) {
                             await dialog.accept();
                             logger.info('Dialog accepted');
                         } else {
                             await dialog.dismiss();
                             logger.info('Dialog dismissed');
                         }
                         resolve();
                     });
                 });
             }


}
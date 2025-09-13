import { chromium, firefox, webkit, Browser, BrowserContext, Page } from 'playwright';
import { Constants } from '../../util/Constants';
import { PageObject } from '../config/PageObject';
import {Locator} from "@playwright/test";

export class Driver {

    #pageObject: PageObject
    #browser: Browser | null = null
    #context: BrowserContext | null = null
    page: Page | null = null

    constructor() {
        this.#pageObject = new PageObject()
    }

    async launchBrowser(browserType: string) {
        if (this.#browser) {
            throw new Error('Browser is already launched')
        }

        interface args { [key: string]: any }
        let launchOptionsArgs: args = {
            ignoreDefaultArgs: ['--enable-automation',
                '--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage',
                '--disable-infobars', '--window-position=0,0', '--ignore-certificate-errors',
                '--ignore-ssl-errors', '--disable-blink-features=AutomationControlled',
                '--disable-web-security', '--disable-features=IsolateOrigins,site-per-process',
                '--disable-extensions', '--remote-allow-origins=*', '--ignore-certificate-errors-spki-list',
                '--disable-popup-blocking'],
            headless: Constants.BROWSWER_HEADLESS,
            slowMo: Constants.BROWSWER_SLOWMO
        }

        switch (browserType) {
            case 'chrome':
                launchOptionsArgs['channel'] = 'chrome'
                this.#browser = await chromium.launch(launchOptionsArgs)
                break
            case 'chromium':
                this.#browser = await chromium.launch(launchOptionsArgs)
                break
            case 'firefox':
                this.#browser = await firefox.launch(launchOptionsArgs)
                break
            case 'msedge':
                launchOptionsArgs['channel'] = 'msedge'
                this.#browser = await chromium.launch(launchOptionsArgs)
                break
            case 'webkit':
                this.#browser = await webkit.launch(launchOptionsArgs)
                break
            default:
                throw new Error(`Unsupported browser type: ${browserType}`)
        }

        this.#context = await this.#browser.newContext({
            viewport: { width: 1280, height: 720 },
            recordVideo: { dir: 'reports/videos/' }
        })

        this.page = await this.#context.newPage()
    }

    async getElement(locatorName: string) {
        if (!this.page) throw new Error('Browser is not launched. Call launchBrowser() first.')
        let element: Locator | null = null
        let [attribute, attributeValue] = await this.#pageObject.get(locatorName)
        switch (attribute.toLowerCase()) {
            case 'id':
                element = await this.page.locator('#' + attributeValue)
                break
            case 'label':
                element = await this.page.getByLabel(attributeValue)
                break
            case 'name':
                element = await this.page.locator('[name="' + attributeValue + '"]')
                break
            case 'xpath':
                element = await this.page.locator(attributeValue)
                break
            case 'placeholder':
                element = await this.page.getByPlaceholder(attributeValue)
                break
            case 'title':
                element = await this.page.getByTitle(attributeValue)
                break
            case 'classname':
                element = await this.page.locator('.' + attributeValue)
                break
            case 'text':
                element = await this.page.getByText(attributeValue)
                break
            case 'testid':
                element = await this.page.getByTestId(attributeValue)
                break
        }
        if (element) {
            await element.scrollIntoViewIfNeeded()
            await element.evaluate(el => {
                el.setAttribute('style', 'background: GreenYellow; border: 0px solid blue;')
            })
            await this.page?.waitForTimeout(100);
            await element.evaluate(el => {
                el.setAttribute('style', 'background:; border: 0px solid blue;')
            })
        }
        else {
            console.log('Can not find the Element:', locatorName)
            return;
        }
        return element;
    }

    async closeBrowser() {
        if (this.#browser) {
            await this.#browser.close()
            this.#browser = null
            this.#context = null
            this.page = null
        }
    }

}
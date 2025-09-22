import { chromium, firefox, webkit, Browser, BrowserContext, Page } from 'playwright';
import { Constants } from '../../util/Constants';
import { PageObject } from '../config/PageObject';
import {LaunchOptions, Locator} from "@playwright/test";

export class Driver {

    pageObject: PageObject
    browser: Browser | null = null
    context: BrowserContext | null = null
    page: Page | null = null

    constructor() {
        this.pageObject = new PageObject()
    }

    async launchBrowser(browserType: string) {
        if (this.browser) {
            await this.closeBrowser()
            console.log('Existing Browser closed and new one is launched')
        }

        let launchOptionsArgs: LaunchOptions = {
            headless: Constants.BROWSWER_HEADLESS,
            slowMo: Constants.BROWSWER_SLOWMO,
            args: ['--window-size=1920,1080', '--ignore-certificate-errors', '--enable-automation', '--remote-allow-origins=*',
                '--disable-dev-shm-usage', '--disable-popup-blocking', '--disable-infobars', '--window-position=0,0',
                '--ignore-ssl-errors', '--disable-extensions', '--ignore-certificate-errors-ski-list',
                '--disable-web-security', '--no-sandbox', '--enable-automation'
            ]
        }

        switch (browserType) {
            case 'chrome':
                launchOptionsArgs['channel'] = 'chrome'
                this.browser = await chromium.launch(launchOptionsArgs)
                break
            case 'chromium':
                this.browser = await chromium.launch(launchOptionsArgs)
                break
            case 'firefox':
                this.browser = await firefox.launch(launchOptionsArgs)
                break
            case 'msedge':
                launchOptionsArgs['channel'] = 'msedge'
                this.browser = await chromium.launch(launchOptionsArgs)
                break
            case 'webkit':
                this.browser = await webkit.launch(launchOptionsArgs)
                break
            default:
                throw new Error(`Unsupported browser type: ${browserType}`)
        }

        this.context = await this.browser.newContext({
            viewport: null, //{ width: 1920, height: 1080 }, //{width: 1280, height: 720}
            recordVideo: { dir: 'reports/videos/' }
        })

        this.page = await this.context.newPage()
    }

    async getElement(locatorName: string) {
        if (!this.page) throw new Error('Browser is not launched. Call launchBrowser() first.')
        let element: Locator | null = null
        let [attribute, attributeValue] = await this.pageObject.get(locatorName)
        switch (attribute.toLowerCase()) {
            case 'id':
                element = await this.page.locator('#' + attributeValue).first()
                break
            case 'label':
                element = await this.page.getByLabel(attributeValue).first()
                break
            case 'name':
                element = await this.page.locator('[name="' + attributeValue + '"]').first()
                break
            case 'xpath':
                element = await this.page.locator(attributeValue).first()
                break
            case 'placeholder':
                element = await this.page.getByPlaceholder(attributeValue).first()
                break
            case 'title':
                element = await this.page.getByTitle(attributeValue).first()
                break
            case 'classname':
                element = await this.page.locator('.' + attributeValue).first()
                break
            case 'text':
                element = await this.page.getByText(attributeValue).first()
                break
            case 'testid':
                element = await this.page.getByTestId(attributeValue).first()
                break
        }
        if (element) {
            await element.scrollIntoViewIfNeeded()
            await element.evaluate(el => {
                el.setAttribute('style', 'background: GreenYellow; border: 0px solid blue;')
            })
            // await this.page?.waitForTimeout(20000);
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
        if (this.browser) {
            await this.browser.close()
            this.browser = null
            this.context = null
            this.page = null
        }
    }

}
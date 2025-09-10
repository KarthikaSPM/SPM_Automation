import { chromium, firefox, webkit, Browser, BrowserContext, Page } from 'playwright';
import { Constants } from '../../util/Constants';

export class Driver {

    private browser: Browser | null = null;
    private context: BrowserContext | null = null;
    private page: Page | null = null;

    async launchBrowser(browserType: string) {

        if (this.browser) {
            throw new Error('Browser is already launched');
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
        };

        switch (browserType) {
            case 'chrome':
                launchOptionsArgs['channel'] = 'chrome'
                this.browser = await chromium.launch(launchOptionsArgs);
                break;
            case 'chromium':
                this.browser = await chromium.launch(launchOptionsArgs);
                break;
            case 'firefox':
                this.browser = await firefox.launch(launchOptionsArgs);
                break;
            case 'webkit':
                this.browser = await webkit.launch(launchOptionsArgs);
                break;
            default:
                throw new Error(`Unsupported browser type: ${browserType}`);
        }

        this.context = await this.browser.newContext({
            viewport: { width: 1280, height: 720 },
            recordVideo: { dir: 'reports/videos/' }
        });

        this.page = await this.context.newPage();
    }

    async navigateTo(url: string) {
        if (!this.page) {
            throw new Error('Browser is not launched. Call launchBrowser() first.');
        }
        await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    }

    async takeScreenshot() {
        return await this.page?.screenshot()
    }

    async closeBrowser() {
        if (this.browser) {
            await this.browser.close();
            this.browser = null;
            this.context = null;
            this.page = null;
        }
    }
}
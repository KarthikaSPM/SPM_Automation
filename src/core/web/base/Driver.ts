import { chromium, firefox, webkit, Browser, BrowserContext, Page } from 'playwright';
import { Constants } from '../../util/Constants';

export class Driver {

    private browser: Browser | null = null;
    private context: BrowserContext | null = null;
    private page: Page | null = null;
    private headless: boolean = Constants.PROPERTIES['browser.headless'] === 'true' ? true : false;

    async launchBrowser(browserType: string) {
    if (this.browser) {
      throw new Error('Browser is already launched');
    }

    switch (browserType) {
      case 'chrome':
        this.browser = await chromium.launch({ 
            channel: 'chrome',
            headless: this.headless
        });
        break;
      case 'chromium':
        this.browser = await chromium.launch({ headless: this.headless });
        break;
      case 'firefox':
        this.browser = await firefox.launch({ headless: this.headless });
        break;
      case 'webkit':
        this.browser = await webkit.launch({ headless: this.headless });
        break;
      default:
        throw new Error(`Unsupported browser type: ${browserType}`);
    }

    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
  }

  async navigateTo(url: string) {
    if (!this.page) {
      throw new Error('Browser is not launched. Call launchBrowser() first.');
    }
    await this.page.goto(url);
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
import {Driver} from "./base/Driver";
import {BrowserEvent} from "./browser/BrowserEvent";
import {SendKey} from "./element/SendKey";

export class WebAppDriver {

    #driver: Driver | undefined
    browserEvent: BrowserEvent | undefined
    sendKeys: SendKey | undefined

    constructor() {
    }

    async initialize(browserType: string) {
        this.#driver = await new Driver();
        await this.#driver.launchBrowser(browserType)
        this.browserEvent = await new BrowserEvent(this.#driver)
        this.sendKeys = await new SendKey(this.#driver)
    }
}
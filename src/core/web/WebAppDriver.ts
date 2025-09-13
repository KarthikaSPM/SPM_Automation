import {Driver} from "./base/Driver";
import {BrowserEvent} from "./browser/BrowserEvent";
import {SendKey} from "./element/SendKey";
import {CheckBox} from "./element/CheckBox";
import {Click} from "./element/Click";
import {DoubleClick} from "./element/DoubleClick";
import {BrowserWait} from "./browser/BrowserWait";
import {RadioButton} from "./element/RadioButton";

export class WebAppDriver {

    #driver: Driver | undefined
    browserEvent: BrowserEvent | undefined
    sendKeys: SendKey | undefined
    checkBox: CheckBox | undefined
    click: Click | undefined
    doubleClick: DoubleClick | undefined
    browserWait: BrowserWait | undefined
    radioButton: RadioButton | undefined

    constructor() {
    }

    async initialize(browserType: string) {
        this.#driver = await new Driver();
        await this.#driver.launchBrowser(browserType)
        this.browserEvent = await new BrowserEvent(this.#driver)
        this.browserWait = await new BrowserWait(this.#driver)
        this.sendKeys = await new SendKey(this.#driver)
        this.checkBox = await new CheckBox(this.#driver)
        this.click = await new Click(this.#driver)
        this.doubleClick = await new DoubleClick(this.#driver)
        this.radioButton = await new RadioButton(this.#driver)
    }
}
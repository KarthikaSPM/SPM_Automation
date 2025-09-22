import {Driver} from "./base/Driver";
import {Click} from "./element/Click";
import {SendKey} from "./element/SendKey";
import {CheckBox} from "./element/CheckBox";
import {DoubleClick} from "./element/DoubleClick";
import {BrowserWait} from "./browser/BrowserWait";
import {RadioButton} from "./element/RadioButton";
import {BrowserEvent} from "./browser/BrowserEvent";
import {Assertion} from "./validation/Assertion";
import {SoftAssert} from "./validation/SoftAssertion";

export class WebAppDriver {

    #driver: Driver | undefined
    click: Click | undefined
    sendKeys: SendKey | undefined
    checkBox: CheckBox | undefined
    doubleClick: DoubleClick | undefined
    browserWait: BrowserWait | undefined
    radioButton: RadioButton | undefined
    browserEvent: BrowserEvent | undefined
    assertion: Assertion|undefined
    softassertion:SoftAssert|undefined


    constructor() {}

    async initialize(browserType: string) {
        this.#driver = await new Driver();
        await this.#driver.launchBrowser(browserType)
        this.click = await new Click(this.#driver)
        this.sendKeys = await new SendKey(this.#driver)
        this.checkBox = await new CheckBox(this.#driver)
        this.doubleClick = await new DoubleClick(this.#driver)
        this.radioButton = await new RadioButton(this.#driver)
        this.browserWait = await new BrowserWait(this.#driver)
        this.browserEvent = await new BrowserEvent(this.#driver)
        this.assertion = await new Assertion(this.#driver)
        this.softassertion = await new SoftAssert()
    }


    async getValue(objName: string) { return this.#driver?.pageObject.getValue(objName); }
}
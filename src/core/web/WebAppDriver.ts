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
import {Dropdown} from "./element/Dropdown";
import {MouseHover} from "./element/MouseHover"
import {ElementGetter} from "./element/ElementGetter"
import {ElementAction} from "./element/ElementAction"
import {Alert} from "./element/Alert"
import {DatePicker} from "./element/DatePicker"

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
    dropdown: Dropdown | undefined
    mousehover: MouseHover | undefined
    elementgetter: ElementGetter | undefined
    elementaction: ElementAction | undefined
    alert: Alert | undefined
    datepicker: DatePicker | undefined

    constructor() {
    }

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
        this.dropdown=await new Dropdown(this.#driver)
        this.mousehover=await new MouseHover(this.#driver)
        this.elementgetter=await new ElementGetter(this.#driver)
        this.elementaction=await new ElementAction(this.#driver)
        this.alert=await new Alert(this.#driver)
        this.datepicker=await new DatePicker(this.#driver)
    }

    async getValue(objName: string) { return this.#driver?.pageObject.getValue(objName); }
}
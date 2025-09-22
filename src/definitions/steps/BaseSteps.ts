import { IWorldOptions, World} from "@cucumber/cucumber";
import {WebAppDriver} from "../../core/web/WebAppDriver";
import {SoftAssert} from "../../core/web/validation/SoftAssertion";

export class BaseSteps extends World {

    protected webDriver: WebAppDriver | null = null

    constructor(options: IWorldOptions) {
        super(options)
        this.webDriver = new WebAppDriver();
    }

}
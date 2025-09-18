import { IWorldOptions, World} from "@cucumber/cucumber";
import {WebAppDriver} from "../../core/web/WebAppDriver";

export class BaseSteps extends World {

    protected webDriver: WebAppDriver | null = null
    public softAssertErrors: string[] = [];

    constructor(options: IWorldOptions) {
        super(options)
        this.webDriver = new WebAppDriver()
        this.softAssertErrors = [];
    }

}
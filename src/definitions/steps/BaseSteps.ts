import { IWorldOptions, World} from "@cucumber/cucumber";
import { Driver } from "../../core/web/base/Driver";
import { PageObject } from "../../core/web/base/PageObject";

export class BaseSteps extends World{
    
    protected driver: Driver | null = null;
    protected pageObject: PageObject | null = null;

    constructor(options: IWorldOptions) {
        super(options);    
    }

    async initialize() {
        this.driver = new Driver();
        this.pageObject = new PageObject();
    }
    
}
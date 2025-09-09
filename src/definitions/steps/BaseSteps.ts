import { IWorldOptions, World} from "@cucumber/cucumber";
import { Driver } from "../../core/web/base/Driver";

export class BaseSteps extends World{
    
    protected driver: Driver | null = null;

    constructor(options: IWorldOptions) {
        super(options);    
    }

    async initialize() {
        this.driver = new Driver();
    }
    
}
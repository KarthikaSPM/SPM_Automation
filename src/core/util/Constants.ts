
import { readFileSync } from 'node:fs';
import { getProperties } from 'properties-file';
import path from 'path';

export class Constants {

    static PROPERTIES: { [key: string]: string } = getProperties(readFileSync('framework.properties', 'utf-8'));

    static ROOT_PATH: string | null = process.cwd() + path.sep
    static SRC_PATH: string | null = Constants.ROOT_PATH + 'src' + path.sep
    static TEST_PATH: string | null = Constants.ROOT_PATH + 'test' + path.sep

    static APPL_PATH: string | null = (Constants.TEST_PATH ?? '') + Constants.PROPERTIES['application'] + path.sep
    static APPL_DATA_PATH: string = Constants.APPL_PATH + 'data' + path.sep
    static APPL_DATA_INPUT_PATH: string | null = null
    static APPL_DATA_OUTPUT_PATH: string | null = null
    
    static BROWSWER_HEADLESS: boolean = Constants.PROPERTIES['browser.headless'] === 'true'
    static BROWSWER_SLOWMO: number = parseInt(Constants.PROPERTIES['browser.slowmo'] || '0')
    static STEPWISE_SCREENSHOT: boolean = Constants.PROPERTIES['stepwise.screenshot'] === 'true'
    static PAGE_OBJECT_TYPE: string = Constants.PROPERTIES['page.object.type'] || 'yaml'

}

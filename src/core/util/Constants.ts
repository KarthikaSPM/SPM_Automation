
import { readFileSync } from 'node:fs';
import { getProperties } from 'properties-file';

export class Constants {

    static PROPERTIES: { [key: string]: string } = getProperties(readFileSync('framework.properties', 'utf-8'));

    static ROOT_PATH: string | null = process.cwd()
    static SRC_PATH: string | null = Constants.ROOT_PATH + '/src'
    static TEST_PATH: string | null = Constants.ROOT_PATH + '/src/test'

    static APPL_PATH: string | null = (Constants.TEST_PATH ?? '') + '/' + Constants.PROPERTIES['application']
    static APPL_DATA_PATH: string | null = Constants.APPL_PATH + '/data'
    static APPL_DATA_INPUT_PATH: string | null = null
    static APPL_DATA_OUTPUT_PATH: string | null = null

}

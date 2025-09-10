
import { FileUtil } from '../../util/FileUtil'
import { Constants } from '../../util/Constants'

export class PageObject {

    private fileUtil = new FileUtil()

    locators: {[page: string]:{[element: string]:{[locator: string]:string}}} = {}

    constructor() {
        this.#initialize()
    }

    async #initialize() {
        this.locators = await this.fileUtil.mergeYamlFiles(await this.fileUtil.readAllFileNames(Constants.APPL_DATA_PATH, '.' + Constants.PAGE_OBJECT_TYPE))
    }

    async get(objName: string) {
        let [page, element] = objName.split('.')
        let keyValuePair: any = {};
        if (
            page &&
            element &&
            this.locators[page] &&
            this.locators[page][element]
        ) {
            for (let locator in this.locators[page][element]) {
                if (!(locator === 'value') && locator !== '') {
                    switch (locator.toLowerCase()) {
                        case 'id':
                        case 'css':
                        case 'name':
                        case 'xpath':
                        case 'tagname':
                        case 'linktext':
                        case 'classname':
                        case 'partiallinktext':
                            keyValuePair[locator.toLowerCase()] = this.locators[page][element][locator];
                            return await keyValuePair;
                    }
                }
            }
        }
    }

    async getValue(objName: string) {
        let [page, element] = objName.split('.')
        let keyValuePair: any = {};
        if (
            page &&
            element &&
            this.locators[page] &&
            this.locators[page][element]
        ) {
            for (let locator in this.locators[page][element]) {
                if (!(locator === '')) {
                    switch (locator.toLowerCase()) {
                        case 'value':
                            return this.locators[page][element][locator];
                    }
                }
            }
        }
    }

}

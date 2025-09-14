
import { Constants } from '../../util/Constants'

export class PageObject {

    #locators: {[page: string]:{[element: string]:{[locator: string]:string}}} = {}

    constructor() {
        this.initialize()
    }

    private async initialize() {
        this.#locators = await Constants.LOCATORS
    }

    get(objName: string) : [string, string] {
        let [page, element] = objName.split('.')
        if (
            page &&
            element &&
            this.#locators[page] &&
            this.#locators[page][element]
        ) {
            for (let locator in this.#locators[page][element]) {
                if (!(locator === 'value') && locator !== '') {
                    switch (locator.toLowerCase()) {
                        case 'id': case 'label': case 'name': case 'xpath': case 'placeholder':
                        case 'title': case 'classname': case 'text': case 'testid':
                            return [locator.toLowerCase(), this.#locators[page][element][locator] || '']
                    }
                }
            }
        }
        return ['', ''];
    }

    async getValue(objName: string) {
        let [page, element] = objName.split('.')
        if (
            page &&
            element &&
            this.#locators[page] &&
            this.#locators[page][element]
        ) {
            for (let locator in this.#locators[page][element]) {
                if (locator !== '' && locator.toLowerCase() === 'value') {
                    return this.#locators[page][element][locator]
                }
            }
        }
    }

}

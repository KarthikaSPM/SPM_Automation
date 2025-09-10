import fs from 'fs'
import path from 'path'
import * as yaml from 'js-yaml'

export class FileUtil {

    #filenames: string[] = []

    constructor() {}

    async readAllFileNames(startPath: string, filter: string): Promise<any> {
        await this.recurseThruFiles(startPath, filter);
        // console.log('Found files: ', this.#filenames);
        return this.#filenames;
    }

    async recurseThruFiles(startPath: string, filter: string) {
        if (!fs.existsSync(startPath)) {
            console.log("No directory found: ", startPath);
            return;
        }

        let files: any = fs.readdirSync(startPath);
        for (let i = 0; i < files.length; i++) {
            const filename = path.join(startPath, files[i]);
            const stat = fs.lstatSync(filename);
            if (stat.isDirectory()) {
                await this.recurseThruFiles(filename, filter); // Recurse into subdirectory
            } else if (filename.indexOf(filter) >= 0) {
                this.#filenames.push(filename);
            }
        }
    }

    // Function to deep merge two objects
    deepMerge(target: any, source: any): any {
        for (const key in source) {
            if (source.hasOwnProperty(key)) {
                if (source[key] instanceof Object && !Array.isArray(source[key]) && target[key] instanceof Object && !Array.isArray(target[key])) {
                    target[key] = this.deepMerge(target[key] || {}, source[key]);
                } else {
                    target[key] = source[key];
                }
            }
        }
        return target;
    }

    // Function to merge multiple YAML files
    mergeYamlFiles(filePaths: string[]): any {
        let mergedConfig: any = {};

        for (const filePath of filePaths) {
            const fileContent = fs.readFileSync(filePath, 'utf8');
            const parsedYaml = yaml.load(fileContent);
            mergedConfig = this.deepMerge(mergedConfig, parsedYaml);
        }
        //console.log("Merged YAML content: ", mergedConfig);
        return mergedConfig;
    }

}



import fs from 'fs'
import path from 'path'
import * as yaml from 'js-yaml'


let filenames: string[] = []

export async function readAllFileNames(startPath: string, filter: string): Promise<string[]> {
    await recurseThruFiles(startPath, filter);
    // console.log('Found files: ', this.#filenames);
    return filenames;
}

async function recurseThruFiles(startPath: string, filter: string) {
    if (!fs.existsSync(startPath)) {
        console.log("No directory found: ", startPath);
        return;
    }

    let files: any = fs.readdirSync(startPath);
    for (let i = 0; i < files.length; i++) {
        const filename = path.join(startPath, files[i]);
        const stat = fs.lstatSync(filename);
        if (stat.isDirectory()) {
            await recurseThruFiles(filename, filter); // Recurse into subdirectory
        } else if (filename.indexOf(filter) >= 0) {
            filenames.push(filename);
        }
    }
}

// Function to deep merge two objects
function deepMerge(target: any, source: any): any {
    for (const key in source) {
        if (source.hasOwnProperty(key)) {
            if (source[key] instanceof Object && !Array.isArray(source[key]) && target[key] instanceof Object && !Array.isArray(target[key])) {
                target[key] = deepMerge(target[key] || {}, source[key]);
            } else {
                target[key] = source[key];
            }
        }
    }
    return target;
}

// Function to merge multiple YAML files
export async function mergeYamlFiles(filePaths: Promise<string[]>): Promise<any> {
    let mergedConfig: any = {};
    let filePathsResolved = await filePaths;
    for (const filePath of filePathsResolved) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const parsedYaml = yaml.load(fileContent);
        mergedConfig = deepMerge(mergedConfig, parsedYaml);
    }
    //console.log("Merged YAML content: ", mergedConfig);
    return mergedConfig;
}




import { Driver } from "../base/Driver";

export class Alert {

    #driver: Driver

    constructor(driver: Driver) {
        this.#driver = driver
    }


async acceptAlert(): Promise<void> {
    if (!this.#driver?.page) {
        throw new Error('No page available to accept alert');
    }

    await new Promise<void>((resolve) => {
        console.log("Alert")
        this.#driver.page?.once('dialog', async (dialog) => {
            console.log(`Alert message: ${dialog.message()}`);
            await dialog.accept();
            resolve();
        });
    });

  }

async dismissAlert(): Promise<void> {
    if (!this.#driver?.page) {
        throw new Error('No page available to accept alert');
    }

    await new Promise<void>((resolve) => {
        console.log("Alert")
        this.#driver.page?.once('dialog', async (dialog) => {
            console.log(`Alert message: ${dialog.message()}`);
            await dialog.dismiss();
            resolve();
        });
    });

  }



}
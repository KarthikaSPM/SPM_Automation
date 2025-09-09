
export class Waits {

    static async sleep(millisecond: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, millisecond));
    }

    static async sleepInSeconds(seconds: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, seconds * 1000));
    }

    static async sleepInMinutes(minutes: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, minutes * 1000 * 60));
    }

}
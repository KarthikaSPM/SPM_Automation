
export class SoftAssert {

    private errors: string[] = [];

    assert(condition: boolean, message: string) {
        if (!condition) {
            const formatted = `Soft Assert Failed: ${message}`;
            this.errors.push(formatted);
        }
    }

    public async assertEqual(actual: any, expected: any, message: string) {
        if (actual !== expected) {
            this.errors.push(`${message} - Expected: ${expected}, Actual: ${actual}`);
        }
    }

    getErrors(): string[] {
        return this.errors;
    }

    hasErrors(): boolean {
        return this.errors.length > 0;
    }

    clear() {
        this.errors = [];
    }
}

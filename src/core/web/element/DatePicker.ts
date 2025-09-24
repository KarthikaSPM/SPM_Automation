import { Driver } from "../base/Driver";

export class DatePicker {

    #driver: Driver

    constructor(driver: Driver) {
        this.#driver = driver
    }



/**
 * Selects a date from a datepicker using next/previous month buttons.
 * @param openSelector - Selector to open the datepicker.
 * @param displayedMonthSelector - Selector for the element showing the current month/year (e.g., "September 2025").
 * @param nextMonthSelector - Selector for the "next month" button.
 * @param prevMonthSelector - Selector for the "previous month" button.
 * @param daySelectorTemplate - Template selector for day, e.g., '[data-day="{day}"]'.
 * @param targetYear - Year to select (e.g., 2025).
 * @param targetMonth - Month to select (0 = January, 11 = December).
 * @param targetDay - Day to select (1–31).
 */
async selectDateWithNavigation(
    openSelector: string,
    displayedMonthSelector: string,
    nextMonthSelector: string,
    prevMonthSelector: string,
    daySelectorTemplate: string,
    targetYear: number,
    targetMonth: number,
    targetDay: number
) {
    if (!this.#driver?.page) {
        throw new Error('Page is not available.');
    }
    const page = this.#driver.page;

    // Open the datepicker
    await page.click(openSelector);

    // Helper to parse displayed month/year (customize as per your datepicker's format)

function parseMonthYear(text: string): { year: number, month: number } {

    const cleaned = text.replace(/\s+/g, ' ').trim();
    const [monthName, yearStr] = cleaned.split(' ');

    if (!monthName || !yearStr) {
        throw new Error(`Invalid month/year format: "${text}"`);
    }

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const month = monthNames.indexOf(monthName);
    if (month === -1) {
        throw new Error(`Invalid month name: "${monthName}"`);
    }

    const year = parseInt(yearStr, 10);
    if (isNaN(year)) {
        throw new Error(`Invalid year: "${yearStr}"`);
    }

    return { month, year };
}


    // Navigate to the correct month/year
    while (true) {
        const displayed = await page.textContent(displayedMonthSelector);
        await console.log(displayed)
        if (!displayed) throw new Error('Could not read displayed month/year');
        const { month: currentMonth, year: currentYear } = parseMonthYear(displayed.trim());
        await console.log(currentMonth)
        await console.log(currentYear)
        if (currentYear === targetYear && currentMonth === targetMonth) break;

        if (currentYear > targetYear || (currentYear === targetYear && currentMonth > targetMonth)) {
            await console.log("Prev")
            await this.#driver?.page.click(prevMonthSelector);
        } else {

            await this.#driver?.page.click(nextMonthSelector);
        }
        // Optionally, wait for the calendar to update
        await page.waitForTimeout(200); // Adjust as needed for your UI
    }

    // Select the day
    const daySelector = daySelectorTemplate.replace('{day}', targetDay.toString());
    await page.click(daySelector);
}




/**
 * Selects a specific date from a datepicker by choosing year, month, and day.
 * @param openSelector - Selector to open the datepicker.
 * @param yearSelector - Selector for the year dropdown or button.
 * @param monthSelector - Selector for the month dropdown or button.
 * @param daySelectorTemplate - Template selector for day, e.g., '[data-day="{day}"]'.
 * @param year - Year to select (e.g., 2025).
 * @param month - Month to select (0 = January, 11 = December).
 * @param day - Day to select (1–31).
 */
async selectDateWithDropdown(openSelector: string,
                             yearSelector: string,
                             monthSelector: string,
                             daySelectorTemplate: string,
                             year: number,
                             month: number,
                             day: number) {
    if (!this.#driver?.page) {
        throw new Error('Page is not available.');
    }

    const page = this.#driver.page;

    // Open the datepicker
    await page.click(openSelector);

    // Select year
    await page.selectOption(yearSelector, year.toString());

    // Select month
    await page.selectOption(monthSelector, month.toString());

    // Select day
    const daySelector = daySelectorTemplate.replace('{day}', day.toString());
    await page.click(daySelector);
}



}
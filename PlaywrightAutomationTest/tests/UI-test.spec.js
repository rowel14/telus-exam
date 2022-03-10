const { test, expect, chromium} = require('@playwright/test');
// const {chromium, firefox, webkit} = require('@playwright');

const path = require('path');

test.describe('UI test answers for item 2', () => {

    // test.beforeAll(async () => {


    // })

    test('Verify validation message is displayed when invalid email is provided',  async () => {

        const browser = await chromium.launch({
            headless: false,
        });

        const page = await browser.newPage();
        await page.goto(path.join(__dirname, "../../site/telus-exam.html"))

        const invalidEmail = 'testemail';
        await page.fill('#emailField', invalidEmail);

        await page.locator('button').click();
        
        const isErrorMessageVisible = await page.isVisible('#emailErrorMessage');
        expect(isErrorMessageVisible).toBeTruthy();
    });

    test('Verify validation message is displayed for days of availability field',  async () => {

        const browser = await chromium.launch({
            headless: false,
        });

        const page = await browser.newPage();
        await page.goto(path.join(__dirname, "../../site/telus-exam.html"))

        if (await page.isChecked('#flexibleCheckBox')) {
            page.locator('#flexibleCheckBox').click();
        }

        const nonNumericInput = 'blah';
        await page.locator('#daysForAvailabilityField').fill(nonNumericInput);

        await page.locator('button').click();
        
        const isErrorMessageVisible = await page.isVisible('#daysForAvailabilityErrorMessage');
        expect(isErrorMessageVisible).toBeTruthy();
    });


    test('Verify no validation message is displayed when all inputs are valid', async () => {
        
    })

    test('Verify no validation message is displayed when all inputs are valid', async () => {
        
    })
});
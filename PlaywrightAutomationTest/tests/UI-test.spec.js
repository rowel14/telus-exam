const { test, expect, chromium} = require('@playwright/test');
const path = require('path');

let page;

test.describe('UI test answers for item 2', () => {
    test.beforeEach(async ({}) => {
        const browser = await chromium.launch({
            headless: false
        
        });
            
        page = await browser.newPage();
        await page.goto(path.join(__dirname, "../../site/telus-exam.html"));
    });

    test.only('Verify validation message is displayed when invalid email is provided',  async ({}) => {

        const invalidEmail = 'testemail';
        await page.fill('#emailField', invalidEmail);

        await page.locator('button').click();
        
        const isErrorMessageVisible = await page.isVisible('#emailErrorMessage');
        expect(isErrorMessageVisible).toBeTruthy();
    });

    test('Verify validation message is displayed for days of availability field',  async () => {


        if (await page.isChecked('#flexibleCheckBox')) {
            page.locator('#flexibleCheckBox').click();
        }

        const nonNumericInput = 'blah';
        await page.locator('#daysForAvailabilityField').fill(nonNumericInput);

        await page.locator('button').click();
        
        const isErrorMessageVisible = await page.isVisible('#daysForAvailabilityErrorMessage');
        expect(isErrorMessageVisible).toBeTruthy();
    });


});
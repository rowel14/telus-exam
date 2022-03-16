const { test, expect, chromium} = require('@playwright/test');
const path = require('path');
const {UserFormPage} = require('../PageObjects/UserFormPage')

test.describe('UI test answers for item 2', () => {

    let page = null;
    let browser = null;
    let context = null;
    let userFormPage = null; 

    test.beforeEach(async ({}) => {
        browser = await chromium.launch({ headless: false });       
        context = await browser.newContext();
        page = await context.newPage();

        userFormPage = new UserFormPage(page);

        userFormPage.navigate();
    });

    test('Verify validation message is displayed when invalid email is provided',  async () => {

        // Test data to use for email field
        const invalidEmail = 'testemail';

        // This is to input value on the email field
        await userFormPage.inputEmail(invalidEmail);

        // This is to click save button
        await userFormPage.clickSaveButton();

        // This asserts if the email error message is visible
        expect(userFormPage.emailErrorMessage).toBeVisible()

    });

    test('Verify validation message is displayed for days of availability field',  async () => {

        // Test data to use for check box and day for availability field 
        const checkBoxStatus = false;
        const nonNumericValue = 'invalid';

        // This is to uncheck the check box 
        userFormPage.isCheckBoxChecked(checkBoxStatus);

        // This is to input value on the days for availability field
        userFormPage.inputDaysForAvailability(nonNumericValue);

        // This is to click save button
        userFormPage.clickSaveButton();

        // This asserts if days for availability error message is visible
        expect(userFormPage.daysForAvailabilityErrorMessage).toBeVisible();
    });

});
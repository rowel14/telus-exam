/// <reference types="cypress" />
const path = require('path');

import UserFormPage from '../support/PageObjects/UserFormPage'

describe('UI test answers for item 3', () => {

    const userFormPage = new UserFormPage();

    beforeEach(() => {

        // This runs the html file containing the app
        cy.visit(path.join(__dirname, "../../site/telus-exam.html"))
    })

    it('Verify error message is displayed if no value is supplied for full name after clicking save', () => {

        // This is to click save button
        userFormPage.clickSaveBtn()

        // This asserts full name error message is displayed after clicking save button
        cy.get('#fullNameErrorMessage')
        .should('be.visible')
        .and('have.text', 'Full Name is required.')

    })

    it('Verify error message is displayed if full name field exceed 100 characters', () => {
        
        // Test data for full name with more than 100 characters
        const moreThan100CharFullName = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut'

        // This is to input value on full name field
        userFormPage.inputFullName(moreThan100CharFullName)

        // This is to click save button
        userFormPage.clickSaveBtn()

        // This asserts full name max limit of 100 error message is displayed after clicking save button
        cy.get('#fullNameErrorMessage')
        .should('be.visible')
        .and('have.text', 'Full Name exceeds max limit of 100.')

    })

    it('Verify no error message is displayed when email field is blank', () => {

        // This is to click save button
        userFormPage.clickSaveBtn()
        
        // This asserts email error message doesn't exist
        cy.get('#emailErrorMessage').should('not.exist')
    })

    it('Verify days for availability field is not required when flexible checkbox is checked', () =>{

        // This is to tick uncheck check box
        userFormPage.isCheckBoxChecked(true)

        // This is to click save button
        userFormPage.clickSaveBtn()

        // This asserts days for availability error message doesn't exist
        cy.get('#daysForAvailabilityErrorMessage')
        .should('not.exist')
    })

    it('verify error message is displayed when flexible checkbox is checked and invalid value is supplied for Days For Availability', () =>{

        // Invalid test data for days for availability
        const invalidDays = 'invalid'

        // This is to tick uncheck check box
        userFormPage.isCheckBoxChecked(true)

        // This is to input value in days for availability field
        userFormPage.inputDaysForAvailability(invalidDays)

        // This is to click save button
        userFormPage.clickSaveBtn()

        // This asserts days for availability error message is displayed and have a text "Days for Availability should have a valid value."
        cy.get('#daysForAvailabilityErrorMessage')
        .should('be.visible')
        .and('have.text', 'Days for Availability should have a valid value.')
    })

    it('Verify no error message is displayed when all required fields have valid value and flexible checkbox is checked', () => {

        // Valid test data for full name 
        const validFullName = 'John Doe'

        // This is to input value in full name field
        userFormPage.inputFullName(validFullName)

        // This is to tick uncheck check box
        userFormPage.isCheckBoxChecked(true)

        // This is to click save button
        userFormPage.clickSaveBtn()

        // This asserts error message for full name, email, and days for availability are not exist
        cy.get('#fullNameErrorMessage').should('not.exist')
        cy.get('#emailErrorMessage').should('not.exist')
        cy.get('#daysForAvailabilityErrorMessage').should('not.exist')
    })

    it('verify no error message is displayed when all fields have valid value and flexible checkbox is unchecked', () => {
        
        // Valid test data for full name
        const validFullName = 'John Doe'

        // Valid test data for email
        const validEmail = 'JohnDoe@gmail.com'

        // Valid test data for days for availability
        const validDays = 2
        

        // This is to input value in full name field
        userFormPage.inputFullName(validFullName)

        // This is to input value in email field
        userFormPage.inputEmailAddress(validEmail)

        // This is to uncheck checkbox
        userFormPage.isCheckBoxChecked(false)

        // This is to input value in days for availability field
        userFormPage.inputDaysForAvailability(validDays)

        // This is to click save button
        userFormPage.clickSaveBtn()

        // This asserts error message for full name, email, and days for availability are not exist
        cy.get('#fullNameErrorMessage').should('not.exist')
        cy.get('#emailErrorMessage').should('not.exist')
        cy.get('#daysForAvailabilityErrorMessage').should('not.exist')
    })
})
class UserFormPage {

inputFullName(fullName){
    cy.get('input[name="fullName"]').type(fullName);
}

inputEmailAddress(email){
    cy.get('input[name="email"]').type(email)
}

isCheckBoxChecked(checkBoxStatus){

    if(checkBoxStatus){
        cy.get('#flexibleCheckBox').check()
    }else{
        cy.get('#flexibleCheckBox').uncheck()
    }
}

inputDaysForAvailability(days){
    cy.get('#daysForAvailabilityField').type(days)
}

clickSaveBtn(){
    cy.get('button').click()
}

}
export default UserFormPage
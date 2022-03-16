const path = require('path');
class UserFormPage {

   

    constructor(page) {
        this.page = page;
        this.fullNameField = page.locator('[name="fullName"]');
        this.emailField = page.locator('[name="email"]');
        this.flexibleCheckBox = page.locator('[name="flexible"]');
        this.daysForAvailability = page.locator('[name="daysForAvailability"]');
        this.saveButton = page.locator('button');
        this.fullNameErrorMessage = page.locator('#fullNameErrorMessage');
        this.emailErrorMessage = page.locator('#emailErrorMessage');
        this.daysForAvailabilityErrorMessage = page.locator('#daysForAvailabilityErrorMessage');
    }

    async navigate() {
        await this.page.goto(path.join(__dirname, "../site/telus-exam.html"));
    }
    async inputFullname(fullName){
        await this.fullNameField.fill(fullName);
    }

    async inputEmail(email){
        await this.emailField.fill(email);
    }

    async isCheckBoxChecked(checkBoxStatus){

        if(checkBoxStatus){
            await this.flexibleCheckBox.check();
        }else{
            await this.flexibleCheckBox.uncheck();
        }
    }

    async inputDaysForAvailability(days){
        await this.daysForAvailability.fill(days);
    }

    async clickSaveButton(){
        await this.saveButton.click();
    }

}
module.exports = { UserFormPage };
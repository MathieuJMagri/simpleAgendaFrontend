//Scenario 1 - Normal Flow
Given("user is not logged in", () =>{
    cy.visit("/");
    cy.findAllByRole("heading", { name: "Login" });
});

Given("no account is registered with email {string}", (username) => {
//Nothing to do here
});

When("this user requests to register with email {string} and password {string}", (username, password) => {
    const d = new Date();

    cy.get('[id=register-button]').click();
    
    cy.get('[id=register-username]').clear();
    cy.get('[id=register-username]').type(d.getTime() + username);

    cy.get('[id=register-password]').clear();
    cy.get('[id=register-password]').type(password);

    cy.get('[id=register-retype-password]').clear();
    cy.get('[id=register-retype-password]').type(password);

    cy.get('[id=submit-register]').click();

    });

    Then("an account will be created", () => {
        cy.findAllByRole("heading", { name: "TODO LIST" });
    });

//Scenario 2 - Error Flow 1
Given("user is not logged in", () =>{
    cy.visit("/");
    cy.findAllByRole("heading", { name: "Login" });
});

When("this user requests to register with email {string} and invalid password {string}", (username, password) =>{
    cy.get('[id=register-button]').click();
    
    cy.get('[id=register-username]').clear();
    cy.get('[id=register-username]').type(username);

    //Testing empty password, therefore we just clear the field.
    cy.get('[id=register-password]').clear();

    cy.get('[id=register-retype-password]').clear();

    cy.get('[id=submit-register]').click();

});

Then("no account will be created", () => {
    cy.get('[id=register-username]');
});

//Scenario 2 - Error Flow 2
Given("user is not logged in", () =>{
    cy.visit("/");
    cy.findAllByRole("heading", { name: "Login" });
});

Given("an account is already registered with email {string}", () => {
    //Nothing to do here, already in database
});

When("this user requests to register with used email {string} and password {string}", (username, password) =>{
    cy.get('[id=register-button]').click();
    
    cy.get('[id=register-username]').clear();
    cy.get('[id=register-username]').type(username);

    cy.get('[id=register-password]').clear();
    cy.get('[id=register-password]').type(password);

    cy.get('[id=register-retype-password]').clear();
    cy.get('[id=register-retype-password]').type(password);

    cy.get('[id=submit-register]').click();

});

Then("no account will be created", () => {
    cy.get('[id=register-username]');
});
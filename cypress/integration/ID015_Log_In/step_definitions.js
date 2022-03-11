
Given("user is not logged on", () => {
  cy.visit("/");
  cy.findAllByRole("heading", { name: "Login" });
});

Given("user has an account registered with username {string} and password {string}", () => {
});

When("this user requests to log into account {string} with password {string}", (username, password) => {
  cy.visit("/");
  cy.get("#username").clear();
  cy.get("#username").type(username);
  cy.get("#password").clear();
  let text1 = "{enter}";
  let text2 = password;
  text2+=text1;
  cy.get("#password").type(text2);
});

Then("the user will be taken to their List of Tasks page", () => {
  cy.findAllByRole("heading", { name: "TODO LIST" });
});

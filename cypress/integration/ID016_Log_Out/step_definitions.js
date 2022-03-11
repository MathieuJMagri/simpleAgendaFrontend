When("user requests to log out", () => {
  cy.get("#logout").click();
});

Then("guest is at the login page", () => {
  cy.findAllByRole("heading", { name: "Login" });
});

Then("guest receives message {string}", (msg) => {
  cy.contains(msg);
});

When("user exits the app", () => {
  cy.visit("/exited");
});

Then("user is logged out", () => {
  cy.visit("/");
  cy.findAllByRole("heading", { name: "Login" });
});

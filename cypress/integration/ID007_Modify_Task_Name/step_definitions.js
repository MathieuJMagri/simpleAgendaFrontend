import { clickTaskBtn } from "../helper";

When("user renames task {string} to {string}", (taskName, newTaskName) => {
  clickTaskBtn(taskName, "edit task");
  cy.get("h3 > input").clear();
  cy.get("h3 > input").type(newTaskName);
  cy.get('[data-testid="save task"]').click();
  if (newTaskName.trim() === "") {
    cy.get('[data-testid="cancel edit task"]').click();
  }
});

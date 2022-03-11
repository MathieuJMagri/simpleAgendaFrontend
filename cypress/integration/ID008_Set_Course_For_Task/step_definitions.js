import { clickTaskBtn } from "../helper";

Given(
  "user requests that {string} be assigned to course {string}",
  (taskName, courseName) => {
    clickTaskBtn(taskName, "edit task");
    cy.get("#courses").select(courseName);
    cy.get('[data-testid="save task"] > path').click();
  }
);

When("user checks for courses to assign to {string}", (taskName) => {
  clickTaskBtn(taskName, "edit task");
});

Then("there are no courses to assign to {string}", (taskName) => {
  cy.get("#courses").children().should("have.length", 1);
});

import { clickTaskBtn, createTask } from "../helper";

When(
  "user requests to create task {string} with due date {string}",
  (taskName, dueDate) => createTask(taskName, undefined, dueDate)
);

When(
  "user requests to set task {string} with due date {string}",
  (taskName, dueDate) => {
    clickTaskBtn(taskName, "edit task");
    cy.get("#edit-date").type(dueDate); // it's not actually typing, just setting the value
    cy.get('[data-testid="save task"]').click();
  }
);

Then("user has task {string} with due date {string}", (taskName, dueDate) => {
  cy.findAllByRole("heading", { name: taskName });
  cy.contains(dueDate);
});

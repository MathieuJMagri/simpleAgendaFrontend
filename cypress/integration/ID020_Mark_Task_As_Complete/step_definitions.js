import { clickTaskBtn } from "../helper";

When("user requests to mark task {string} as complete", (taskName) => {
  clickTaskBtn(taskName, "check task");
});
When("user requests to mark task {string} as incomplete", (taskName) => {
  clickTaskBtn(taskName, "uncheck task");
});

Then("task {string} is complete", (taskName) =>
  checkCompletion(taskName, true)
);
Then("task {string} is incomplete", (taskName) =>
  checkCompletion(taskName, false)
);
function checkCompletion(taskName, complete) {
  cy.findAllByRole("heading", { name: taskName }); // need this to prevent a race condition
  cy.get(".task > h3 > span")
    .contains(taskName)
    .siblings(`[data-testid="${complete ? "un" : ""}check task"]`);
}

Given("user marks task {string} as complete", (taskName) => {
  clickTaskBtn(taskName, "check task");
});

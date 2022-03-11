export async function createTask(taskName, courseCode, dueDate) {
  cy.get("#task-section-header > .btn").click();
  cy.get("#task-name").clear();
  if (taskName !== "") {
    cy.get("#task-name").type(taskName);
  }
  if (courseCode !== undefined) {
    cy.get("#course").select(courseCode);
  }
  if (dueDate !== undefined) {
    cy.get("#deadline").type(dueDate).debug(); // it's not actually typing, just setting the value
  }

  cy.get(".add-form > .btn").click();
  if (taskName === "") {
    cy.get(".close-icon").click();
    return false;
  } else {
    return true;
  }
}

export async function createCourse(code, term = "F21", duplicate = false) {
  const trimmedCode = code.trim();
  const trimmedTerm = term.trim();

  cy.get("#course-section-header > .btn").click();
  cy.get("#course-code").clear();
  if (trimmedCode !== "") {
    cy.get("#course-code").type(code);
  }
  cy.get("#course-name").clear();
  cy.get("#course-name").type("Robotics and Intelligent Systems");
  cy.get("#course-term").clear();
  if (trimmedTerm !== "") {
    cy.get("#course-term").type(term);
  }
  cy.get(".add-form > .btn").click();

  if (trimmedCode === "" || trimmedTerm === "" || duplicate) {
    cy.get(".close-icon").click();
    return false;
  } else {
    return true;
  }
}

// only works buttons that exist when not in edit mode
export function clickTaskBtn(taskName, dataTestId) {
  cy.findAllByRole("heading", { name: taskName }); // need this to prevent a race condition
  cy.get(".task > h3 > span")
    .contains(taskName)
    .siblings(`[data-testid="${dataTestId}"]`)
    .click();
}

export function clickDeleteCourse(courseCode) {
  cy.findAllByRole("heading", { name: courseCode }); // need this to prevent a race condition
  cy.get(".course > h3")
    .contains(courseCode)
    .siblings('[data-testid="delete course"]')
    .click();
}

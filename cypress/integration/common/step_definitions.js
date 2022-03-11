import { createTask, createCourse, clickDeleteCourse } from "../helper";

const BACKEND_URL = "https://mcgill-ecse428-f2021-g7backend.herokuapp.com";

// HELPER

const deleteAllTasks = async () => await deleteAll("tasks");
const deleteAllCourses = async () => await deleteAll("courses");

async function deleteAll(type) {
  // type should be "tasks" or "courses"
  return await fetch(BACKEND_URL + `/${type.slice(0, -1)}/delete-all`, {
    method: "DELETE",
  });
}

function logOn() {
  cy.visit("/");
  cy.get("#username").clear();
  cy.get("#username").type("jeffbezos");
  cy.get("#password").clear();
  cy.get("#password").type("1234{enter}");
}

function logOut() {
  cy.get("#logout").click();
}

// BACKGROUND
Given("user has no tasks", deleteAllTasks);
Given("user has no courses", deleteAllCourses);

Given(/^user is logged on$/, logOn);

Given(/^user is not logged on$/, logOut);

// NON-BACKGROUND

// creating courses
Given("user creates course with code {string} and term {string}", createCourse);
Given("user creates course with code {string}", createCourse);
Given("user creates courses", createCourses);
When("user requests to create course with code {string}", createCourse);
When("user requests to create courses", createCourses);
When("user requests to create duplicate courses", (table) =>
  createCourses(table, true)
);
async function createCourses(table, duplicate = false) {
  const courseCode = 0;
  const term = 1;
  for (let i = 1; i < table.rawTable.length; i++) {
    const theCourseCode = table.rawTable[i][courseCode];

    if (await createCourse(theCourseCode, table.rawTable[i][term], duplicate)) {
      cy.findAllByRole("heading", { name: theCourseCode }); // prevent race conditions
    }
  }
}

// creating tasks
Given("user creates task {string} of course {string}", createTask);
Given("user creates task {string}", createTask);
When("user requests to create task {string} of course {string}", createTask);
Given("user creates tasks", createTasks);
When("user requests to create tasks", createTasks);
async function createTasks(table) {
  const taskName = 0;
  const courseCode = 1;
  for (let i = 1; i < table.rawTable.length; i++) {
    const theCourseCode = table.rawTable[i][courseCode];
    const theTaskName = table.rawTable[i][taskName];

    if (await createCourse(table.rawTable[i][courseCode], "F21")) {
      cy.findAllByRole("heading", { name: theCourseCode }); // prevent race conditions
    }
    if (await createTask(theTaskName, theCourseCode)) {
      cy.findAllByRole("heading", { name: theTaskName }); // prevent race conditions
    }
  }
}

// Has or has no tasks or courses
Then("user has tasks", (table) => {
  const taskName = 0;
  for (let i = 1; i < table.rawTable.length; i++) {
    cy.findAllByRole("heading", { name: table.rawTable[i][taskName] });
  }
});
When("user has courses", userHasCourses);
Then("user has courses", userHasCourses);
function userHasCourses(table) {
  const courseCode = 0;
  const term = 1;
  for (let i = 1; i < table.rawTable.length; i++) {
    cy.findAllByRole("heading", { name: table.rawTable[i][courseCode] });

    const courseTerm = table.rawTable[i][term];
    if (courseTerm !== undefined) {
      cy.get(".course").contains(courseTerm);
    }
  }
}
Then("user has no tasks", () => cy.contains(/No tasks to show/i));
Then("user has no courses", () => cy.contains(/No courses to show/i));
Then("user has no tasks and no courses", () => {
  cy.contains("No tasks to show");
  cy.contains("No courses to show");
});

// Other
When("user requests to remove courses", (table) => {
  const courseCode = 0;
  for (let i = 1; i < table.rawTable.length; i++) {
    const theCourseCode = table.rawTable[i][courseCode];

    clickDeleteCourse(theCourseCode);
  }
});
When("user reloads the app", logOn);

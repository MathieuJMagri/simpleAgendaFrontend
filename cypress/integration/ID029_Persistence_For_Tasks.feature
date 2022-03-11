Feature: Data persistence for tasks

  As a registered student
  I would like my tasks to persist on the app
  So that I can still see them when I use the app another time

  Background:
    Given user has no tasks
    And user has no courses
    And user is logged on

  Scenario: Fetch a list of created tasks (Normal Flow)
    Given user requests to create tasks
      | Task_Name        | Course Code |
      | Watch tutorial 1 | COMP417     |
    And user reloads the app
    Then user has tasks
      | Task_Name        | Course Code |
      | Watch tutorial 1 | COMP417     |

  Scenario: Delete a task permanently (Alternate Flow)
    Given user creates tasks
      | Task_Name           | Course  |
      | Watch tutorial 1    | COMP417 |
      | Finish assignment 1 | ECSE415 |
    When user requests to remove tasks
      | Task_Name        | Course Code |
      | Watch tutorial 1 | COMP417     |
    And user reloads the app
    Then user has tasks
      | Task_Name           | Course  |
      | Finish assignment 1 | ECSE415 |

  Scenario: A task that fails to create does not persist (Error Flow)
    When user requests to create tasks
      | Task_Name | Course Code |
      |           |             |
    And user reloads the app
    Then user has no tasks
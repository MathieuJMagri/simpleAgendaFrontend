Feature: Modify a Task Name

  As a to-do list user
  I would like to modify a task name
  So that I can rename an existing task if a more appropriate name is desired

  Background:
    Given user has no tasks
    And user has no courses
    And user is logged on

  Scenario: Pick a task to modify its name (Normal Flow)
    Given user creates tasks
      | Task_Name                  | Course  |
      | Submit lab report          | ECSE420 |
      | Finish assignment A        | ECSE428 |
      | Review team research paper | CCOM206 |
    When user renames task "Review team research paper" to "Review and edit team research paper"
    Then user has tasks
      | Task_Name                           | Course  |
      | Submit lab report                   | ECSE420 |
      | Finish assignment A                 | ECSE428 |
      | Review and edit team research paper | CCOM206 |

  Scenario: Modify a task name to empty value (Error Flow)
    Given user creates tasks
      | Task_Name                  | Course  |
      | Submit lab report          | ECSE420 |
      | Finish assignment A        | ECSE428 |
      | Review team research paper | CCOM206 |
    When user renames task "Review team research paper" to " "
    Then user has tasks
      | Task_Name                  | Course  |
      | Submit lab report          | ECSE420 |
      | Finish assignment A        | ECSE428 |
      | Review team research paper | CCOM206 |

Feature: Add a new task

  User Story:
  As a to-do list user
  I would like to create a new task
  So that I can keep track of active tasks that I need to do

  Background:
    Given user has no tasks
    And user has no courses
    And user is logged on

  Scenario: Create a new task (Normal flow)
    Given user creates course with code "COMP417" and term "F21"
    When user requests to create task "Watch tutorial 1" of course "COMP417"
    Then user has tasks
      | Task_Name        | Course Code |
      | Watch tutorial 1 | COMP417     |

  Scenario: Create a duplicate task (Alternate flow)
    Given user creates course with code "COMP417" and term "F21"
    And user creates task "Watch tutorial 1" of course "COMP417"
    When user requests to create task "Watch tutorial 1" of course "COMP417"
    Then user has tasks
      | Task_Name        | Course Code |
      | Watch tutorial 1 | COMP417     |
      | Watch tutorial 1 | COMP417     |

  Scenario: User attempts to create a new task without entering the task name (Error flow)
    Given user creates course with code "COMP417" and term "F21"
    When user requests to create task "" of course "COMP417"
    Then user has no tasks
Feature: Set the course for the task

  As a to-do list user
  I would like to assign a course to a task
  So that tasks can be grouped by course

  Background:
    Given user has no tasks
    And user has no courses
    And user is logged on

  Scenario: Assign a course to a task on creation (Normal Flow)
    Given user creates course with code "MyCourse"
    When user requests to create task "MyTask" of course "MyCourse"
    Then user has tasks
      | Task_Name | Course Code |
      | MyTask    | MyCourse    |

  Scenario: Assign a course to a task later (Alternate Flow)
    Given user creates task "MyTask"
    And user creates course with code "MyCourse"
    When user requests that "MyTask" be assigned to course "MyCourse"
    Then user has tasks
      | Task_Name | Course Code |
      | MyTask    | MyCourse    |

  Scenario: Attempt to assign a course to a task when there are no courses (Error Flow)
    Given user creates task "MyTask"
    When user checks for courses to assign to "MyTask"
    Then there are no courses to assign to "MyTask"


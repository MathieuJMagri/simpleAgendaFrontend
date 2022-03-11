Feature: Delete a Course

  As a student
  I would like to delete a course
  So that my scheduler system does not incorporate the course that I am no longer enrolled in.

  Background:
    Given user has no tasks
    And user has no courses
    And user is logged on

  Scenario: Pick one course to delete (Normal Flow)
    Given user creates courses
      | Course  | Term |
      | ECSE200 | F21  |
      | ECSE321 | F21  |
      | ECSE428 | F21  |
    When user requests to remove courses
      | Course  | Term |
      | ECSE200 | F21  |
    Then user has courses
      | Course  | Term |
      | ECSE321 | F21  |
      | ECSE428 | F21  |

  Scenario: Delete a course that is attached to at least one task (Alternate Flow)
    Given user creates tasks
      | Task_Name        | Course Code |
      | Watch tutorial 1 | COMP417     |
    When user requests to remove course "COMP417"
    Then user has no tasks and no courses

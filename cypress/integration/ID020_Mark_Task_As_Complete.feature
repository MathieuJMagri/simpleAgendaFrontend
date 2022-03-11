Feature: Mark task as complete

  As a registered user
  I would like to mark my task as complete
  So that I can focus on incomplete tasks

  Background:
    Given user has no tasks
    And user has no courses
    And user is logged on

  Scenario: Mark task as complete (Normal Flow)
    Given user creates courses
      | Course  | Term |
      | COMP417 | F21  |
    And user creates task "Watch tutorial 1" of course "COMP417"
    When user requests to mark task "Watch tutorial 1" as complete
    Then task "Watch tutorial 1" is complete

  Scenario: Revert task to incomplete status (Alternate Flow)
    Given user creates courses
      | Course  | Term |
      | COMP417 | F21  |
    And user creates task "Watch tutorial 1" of course "COMP417"
    And user marks task "Watch tutorial 1" as complete
    When user requests to mark task "Watch tutorial 1" as incomplete
    Then task "Watch tutorial 1" is incomplete
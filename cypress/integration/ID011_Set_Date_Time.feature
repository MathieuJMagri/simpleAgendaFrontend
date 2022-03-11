Feature: Set due date and time for task

  As a student
  I would like to know when my tasks are due
  So that I can work on them beforehand

  Background:
    Given user has no tasks
    And user has no courses
    And user is logged on

  Scenario: Assign date/time to task on creation (Normal Flow)
    When user requests to create task "Watch tutorial 1" with due date "2021-11-10T18:34"
    Then user has task "Watch tutorial 1" with due date "2021-11-10T18:34"

  Scenario: Assign date/time to task later (Alternate Flow)
    Given user creates task "Watch tutorial 1"
    When user requests to set task "Watch tutorial 1" with due date "2021-11-10T18:34"
    Then user has task "Watch tutorial 1" with due date "2021-11-10T18:34"
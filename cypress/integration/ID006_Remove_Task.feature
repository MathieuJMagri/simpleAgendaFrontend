Feature: Remove Task

  User Story:
  As a to-do list user
  I would like to remove an existing task
  So that I can get rid of tasks that I do not need

  Background:
    Given user has no tasks
    And user has no courses
    And user is logged on

  Scenario: Remove an existing task (Normal flow)
    Given user creates course with code "COMP417" and term "F21"
    And user creates task "Presentation" of course "COMP417"
    When user requests to remove task "Presentation"
    Then user has no tasks
Feature: Log in

  As a registered user
  I would like to log into my account
  So that I can access and manage my tasks

  Background:
	Given user is not logged on

  Scenario: Log in (Normal Flow)
    Given user has an account registered with username "jeffbezos" and password "1234"
    When this user requests to log into account "jeffbezos" with password "1234"
    Then the user will be taken to their List of Tasks page
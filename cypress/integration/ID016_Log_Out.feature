Feature: Log out

  As a registered user
  I would like to log out of my account
  So that I can prevent other users from accessing my account when I am finished

  Background:
    Given user is logged on

  Scenario: Log out (Normal Flow)
    When user requests to log out
    Then guest is at the login page
    And guest receives message "Successfully logged out"

  Scenario: Log out automatically by exiting the window (Alternate Flow)
    When user exits the app
    Then user is logged out
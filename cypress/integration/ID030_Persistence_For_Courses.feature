Feature: Data persistence for courses

  As a student
  I would like my courses to persist on the app
  So that I can still see them when I use the app another time

  Background:
    Given user has no tasks
    And user has no courses
    And user is logged on

  Scenario: Fetch a list of created courses (Normal Flow)
    Given user creates course with code "ECSE200"
    When user has courses
      | Code    |
      | ECSE200 |
    And user reloads the app
    Then user has courses
      | Code    |
      | ECSE200 |

  Scenario: Delete a course permanently (Alternate Flow)
    Given user creates courses
      | Code    |
      | ECSE200 |
      | ECSE321 |
      | ECSE428 |
    When user requests to remove courses
      | Code    |
      | ECSE200 |
    And user reloads the app
    Then user has courses
      | Code    |
      | ECSE321 |
      | ECSE428 |

  Scenario: Failed to create course does not persist (Error Flow)
    When user requests to create course with code ""
    And user reloads the app
    Then user has no courses
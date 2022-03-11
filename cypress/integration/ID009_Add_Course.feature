Feature: Add course

  As a student
  I would like to add a course
  So that I can have courses with which to tag and view my tasks by.

  Background:
    Given user has no tasks
    And user has no courses
    Given user is logged on

  Scenario: Add a new well-named course (Normal Flow)
    Given user creates courses
      | Course  | Term |
      | ECSE223 | W20  |
      | ECSE321 | F20  |
    When user requests to create courses
      | Course  | Term |
      | ECSE428 | F21  |
    Then user has courses
      | Course  | Term |
      | ECSE223 | W20  |
      | ECSE321 | F20  |
      | ECSE428 | F21  |

  Scenario: Add a new course without entering its name or term (Error Flow)
    Given user creates courses
      | Course  | Term |
      | ECSE223 | W20  |
      | ECSE321 | F20  |
    When user requests to create courses
      | Course | Term |
      |        |      |
    Then user has courses
      | Course  | Term |
      | ECSE223 | W20  |
      | ECSE321 | F20  |

  Scenario: Add a new course without entering its term (Error Flow)
    Given user creates courses
      | Course  | Term |
      | ECSE223 | W20  |
      | ECSE321 | F20  |
    When user requests to create courses
      | Course  | Term |
      | ECSE428 |      |
    Then user has courses
      | Course  | Term |
      | ECSE223 | W20  |
      | ECSE321 | F20  |

  Scenario: Add a new course without entering its name (Error Flow)
    Given user creates courses
      | Course  | Term |
      | ECSE223 | W20  |
      | ECSE321 | F20  |
    When user requests to create courses
      | Course | Term |
      |        | F21  |
    Then user has courses
      | Course  | Term |
      | ECSE223 | W20  |
      | ECSE321 | F20  |


  Scenario: Add a course that has already been added (Error Flow)
    Given user creates courses
      | Course  | Term |
      | ECSE223 | W20  |
      | ECSE321 | F20  |
      | ECSE428 | F21  |
    When user requests to create duplicate courses
      | Course  | Term |
      | ECSE428 | F21  |
    Then user has courses
      | Course  | Term |
      | ECSE223 | W20  |
      | ECSE321 | F20  |
      | ECSE428 | F21  |
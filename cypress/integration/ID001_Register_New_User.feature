Feature: Register New User

  As an uregistered user
  I would like to register for the todo system
  So that I can manage my tasks

  Background:
    Given user is not logged in

  Scenario: Register New User (Normal Flow)
    Given no account is registered with email "mybusinessaccount@gmail.com"
    When this user requests to register with email "mybusinessaccount@gmail.com" and password "password111"
    Then an account will be created
	
  Scenario: User attemps to register with invalid password (Error Flow)
    When this user requests to register with email "mybusinessaccount@gmail.com" and invalid password ""
	Then no account will be created
	
  Scenario: User attemps to register with an email that is already associated to an account (Error Flow)
    Given an account is already registered with email "jeffbezos"
    When this user requests to register with used email "jeffbezos" and password "12345"
	Then no account will be created
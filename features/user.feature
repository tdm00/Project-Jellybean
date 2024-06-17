Feature: User management

  Scenario: User registration
    Given I am a new user
    When I register with a username and password
    Then I should see a success message

  Scenario: User login
    Given I am a registered user
    When I log in with my username and password
    Then I should receive a token
Feature: Access protected route

  Scenario: Access with valid token
    Given I have a valid token
    When I access the protected route
    Then I should see the decoded token

  Scenario: Access without token
    Given I do not have a token
    When I access the protected route
    Then I should see an error message

  Scenario: Access with invalid token
    Given I have an invalid token
    When I access the protected route
    Then I should see an error message

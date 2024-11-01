Feature: Home

  Scenario: Increments count
    Given I open the homepage
    When I click a button with name "count is 0"
    Then I see a button with name "count is 1"

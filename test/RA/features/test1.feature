Feature: Test1 Features
    This is features of test1

    Scenario: Test1 Scenarios
        Given I open "chrome" browser
        Then I navigate to "https://ey.corpmerchandise.com"
        And I enter "pen" text in "eystore.searchBox"
        And I press "Enter" key on "eystore.searchBox"
        Then I click on "eystore.mardi-pen"
        And I enter "1" text in "eystore.quantity"
        Then I wait for 1 seconds
        Then I click on "eystore.addToCart"
        Then I wait for 3 seconds


    Scenario: Add pen to cart
        Given I open "chrome" browser
        Then I add pen to the cart
        Then I click on "eystore.addToCart"
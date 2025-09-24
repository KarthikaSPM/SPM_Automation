Feature: Test1 Features
    This is features of test1

    # Scenario: Test1 Scenarios
    #     Given I open "chrome" browser
    #     Then I navigate to "https://ey.corpmerchandise.com"
    #     And I enter "pen" text in "eystore.searchBox"
    #     And I press "Enter" key on "eystore.searchBox"
    #     Then I click on "eystore.mardi-pen"
    #     And I enter "1" text in "eystore.quantity"
    #     Then I wait for 1 seconds
    #     Then I click on "eystore.addToCart"
    #     Then I wait for 3 seconds


 #Scenario: Open Blogspot
  # Given I open "chrome" browser
 #  Then I navigate to "https://testautomationpractice.blogspot.com/"
  # Then I verify element "blogspot.text" should have text "GUI Elementss" with soft assert
  # Then I should see page title as "Automation Testing Practice1" with soft assert
  # Then I should see "id" value for "blogspot.name" as "name1"

  Scenario: New Test scenario
  Given I open "chrome" browser
    When I navigate to "https://testautomationpractice.blogspot.com/"
    Then I verify the text "testpage.title" should have text "GUI Elements"
    And I enter the details in the Home Page
    Then I verify the text "testpage.title" should have text "GUI Elements"

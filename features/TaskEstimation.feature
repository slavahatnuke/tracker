Feature: TaskEstimation

  hgfhgfhgfh

  Background:
    Given Home page

    Then I see sign in form
    When I type username "test"
    When I type password "test"
    And click on log in button
    And I see task board

  Scenario: SimpleTaskCalculationPoints
    Then I see task "task 1"
    And I see task "task 2"
    And I see task title input
    When I type task title "p1"
    Then I see task form
    Then I see task complexity buttons
    And I click on task complexity "2+"
    Then I click on save button
    And I see task "p1"
    Then I click on task link "p1"
    Then I am on "p1" page
    Then I don't see task "task 1"
    And I see task complexity "8p"


  Scenario: ProjectsEstimation

    Then I see task "task 1"
    And I see task "task 2"

    And I see task title input
    When I type task title "p1"
    Then I see task form

    Then I click on save button

    And I see task "p1"
    And I don't see task "task1"

    Then I click on task link "p1"

    Then I am on "p1" page
    Then I don't see task "task 2"

    And I see task title input

    When I type task title "1"
    Then I see task form
    Then I see task complexity buttons

    And I click on task complexity "2+"
    And I click on task status "Accepted"
    And I type task spent time "1"

    Then I click on save button

    Then I click on task link "1"
    Then I am on "1" page
    Then I don't see task "p1"



#    Then I click on task link "task 1"
#    Then I am on "task 1" page
#
#    And I see task "task 1.1"
#    And I see task "task 1.2"
#
#    Then I see search form
#    When I search "task 1.1"
#    Then I see task "task 1.1"
#    Then I see task "task 1.1.1"
#    And I don't see task "task 1.2"
#
#    When I search "task 1.2"
#    Then I see task "task 1.2"
#    And I don't see task "task 1.1"
#
#    When I search ""
#    Then I am on "task 1" page
#
#    And I see task "task 1.1"
#    And I see task "task 1.2"
#
#
#  Scenario: Search form visibility
#    When I don't see search form
#    Then I click on task link "task 1"
#    Then I am on "task 1" page
#    Then I see search form
#    Then I click projects
#    And I don't see search form
#
#  Scenario: Search should search by tag
#
#    Then I click on task link "task 1"
#    Then I am on "task 1" page
#
#    Then I click on task link "task 1.1"
#    Then I am on "task 1.1" page
#
#    Then I edit this task
#
#    Then I tag this task with "super-tag"
#    Then I save task
#
#    Then I see task with tag "super-tag"
#
#    When I search "super-tag"
#    Then I sleep 1
#    And I see task "task 1.1"
#
#    When I search "not-super-tag"
#    And I don't see task "task 1.1"
#
#    When I search "super-tag"
#    And I see task "task 1.1"


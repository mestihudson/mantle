Feature: Search Available Company
  Scenario Outline: Search
      Given There <availability> available company with name <name>
       When I search for name <name>
       Then I see that <name> <availability> available

  Examples:
  | name      | availability |
  | 2008 LTD  | isn't        |
  | 4 FIT     | is           |


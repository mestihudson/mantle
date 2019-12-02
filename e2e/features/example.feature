Feature: Search Available Company
  Scenario Outline: Search
      Given There is no available company with <name> name
       When I search for name
       Then I see that name <is-available> available

  Examples:
  | name | is-available |
  | LTD  | is not       |
  | 4FIT | is           |


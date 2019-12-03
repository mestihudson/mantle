import { BeforeAll, AfterAll, Given, When, Then } from 'cucumber'
import { expect } from 'chai'

import Frontend from './Frontend.js'
import Backend from './Backend.js'

let frontend
let backend

const companies = {
  '01 ACCOUNTING SERVICES LTD': '08936412',
  '00E53 LIMITED': 'SC433894',
  '2008 LTD': 'NI041208',
  '2 B SOLUTIONS LTD': '07445391',
  '19 ST.JOHNS ROAD RIGHT TO MANAGE COMPANY LTD': '10553470'
}

BeforeAll(() => {
  frontend = new Frontend()
  backend = new Backend('/ws/e2e/db.json')
})

Given(/^There (is|isn't) available company with name (.+)$/, async (
  availability, name
) => {
  await backend.register(
    availability === 'is'
      ? { results: { result: 'available' } }
      : { results: { result: companies[name] } }
  )
})

When(/^I search for name (.+)$/, async (name) => {
  await frontend.open(process.env.APP_URL)
  expect(await frontend.title()).to.be.equal('Search Available Company')
  await frontend.search(name)
})

Then(/^I see that (.+) (is|isn't) available$/, async (name, availability) => {
  if (availability === 'is') {
    expect(await frontend.success()).to.be.equal(`${name} is available!`)
  } else {
    expect(await frontend.alert()).to.be
      .equal(`${name} is not available! It has ${companies[name]} code.`)
  }
})

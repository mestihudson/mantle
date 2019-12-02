import { BeforeAll, AfterAll, Given, When, Then } from 'cucumber'
import { expect } from 'chai'

import Page from './Page.js'
import Backend from './Backend.js'

let page
let backend

const companies = {
  '01 ACCOUNTING SERVICES LTD': '08936412',
  '00E53 LIMITED': 'SC433894',
  '2008 LTD': 'NI041208',
  '2 B SOLUTIONS LTD': '07445391',
  '19 ST.JOHNS ROAD RIGHT TO MANAGE COMPANY LTD': '10553470'
}

BeforeAll(() => {
  page = new Page()
  backend = new Backend('/ws/e2e/.db.json')
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
  await page.open(process.env.APP_URL)
  expect(await page.title()).to.be.equal('Search Available Company')
  await page.search(name)
})

Then(/^I see that (.+) (is|isn't) available$/, async (name, availability) => {
  if (availability === 'is') {
    expect(await page.success()).to.be.equal(`${name} is available!`)
  } else {
    expect(await page.alert()).to.be
      .equal(`${name} is not available! It has ${companies[name]} code.`)
  }
})

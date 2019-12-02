import { BeforeAll, AfterAll, Given, When, Then } from 'cucumber'
import Page from './page.js'
import client from '../client.js'
import { expect } from 'chai'

let page
let backend = new Backend('')

BeforeAll(() => {
  page = new Page(client.driver)
})

Given(/^There is no available company with (\w+) name$/, async (name) => {
  Backend
})

When('I search for name', () => {
  await page.open(process.env.APP_URL)
  expect(await page.title()).to.be.equal('Search Available Company')
})

Then(/^I see that name (is|is not) available$/, (availability) => {})

import { BeforeAll, AfterAll, Given, When, Then } from 'cucumber'
import Page from './page.js'
import client from '../client.js'
import { expect } from 'chai'

let page

BeforeAll(() => {
  page = new Page(client.driver)
})

Given('setup', async () => {
  await page.open('http://10.30.30.2:3003/')
  expect(await page.title()).to.be.equal('front')
})

When('action', () => {})

Then('verification', () => {})

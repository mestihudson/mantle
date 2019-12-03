import { By, Key } from 'selenium-webdriver'

import client from '../client.js'

export default class Frontend {
  constructor(driver) {
    this.driver = driver || client.driver
  }

  async open(url) {
    await this.driver.get(url)
  }

  async title() {
    return await this.driver.getTitle()
  }

  async search(name) {
    await this.driver.findElement(By.css(`[data-input='Criteria']`))
      .sendKeys(name)
    await this.driver.findElement(By.css(`[data-trigger='Search']`)).click()
  }

  async success() {
    const element = await this.driver
      .findElement(By.css(`[data-output='MessageSuccess']`))
    return element.getText()
  }

  async alert() {
    const element = await this.driver
      .findElement(By.css(`[data-output='MessageAlert']`))
    return element.getText()
  }
}

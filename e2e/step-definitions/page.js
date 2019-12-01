export default class Page {
  constructor(driver) {
    this.driver = driver
  }

  async open(url) {
    await this.driver.get(url)
  }

  async title() {
    return await this.driver.getTitle()
  }
}

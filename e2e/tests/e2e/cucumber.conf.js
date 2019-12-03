import { setDefaultTimeout, Before, After, AfterAll, BeforeAll } from 'cucumber'
import { Builder } from 'selenium-webdriver'
import client from './client'

setDefaultTimeout(60 * 1000)

BeforeAll(() => {
  client.driver = new Builder()
    .forBrowser(process.env.browser || 'chrome')
    .usingServer('http://mantle-hub:4444/wd/hub')
    .build()
})

AfterAll(async () => {
  await client.driver.manage().deleteAllCookies()
  await client.driver.quit()
})

After((context) => {
  const filename = client.filename(context)
  client.saveScreenshot(`${filename}.png`)
  client.saveSource(`${filename}.html`)
})


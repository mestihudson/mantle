import S from 'string'
import fs from 'fs'

const screenshotsPath = process.env.SCREENSHOTS || '.screenshots'

export default {
  filename (context) {
    const status = context.result.status
    const screenshots = screenshotsPath
    const feature = context
      .sourceLocation.uri.replace(/^features\//, '').replace(/\.feature$/, '')
    const scenario = S(context.pickle.name).slugify().s
    const directory = `${screenshots}/${status}/${feature}`
    if (!fs.existsSync(directory)){
      fs.mkdirSync(directory, { recursive: true });
    }
    return `${directory}/${scenario}`
  },
  saveScreenshot (filename) {
    this.driver.takeScreenshot().then((image, errors) => {
      fs.writeFile(filename, image, 'base64', (error) => {
        if(error) {
          console.error(error)
        }
      })
    })
  },
  saveSource (filename) {
    this.driver.getPageSource().then((source) => {
      fs.writeFile(filename, source, (error) => {
        if (error) {
          return console.error(error)
        }
      })
    })
  },
  driver: null
}

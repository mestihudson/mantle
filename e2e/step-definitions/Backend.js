import fs from 'fs'

export default class Backend {
  constructor (db) {
    this.db = db
  }

  async register (content) {
    await fs.writeFile(this.db, JSON.stringify(content), (error) => {
      if (error) {
        return console.error(error)
      }
    })
  }
}

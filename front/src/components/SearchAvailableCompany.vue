<template>
  <div class="search">
    <input
      data-input="Criteria"
      v-model="criteria"
      placeholder="Company Name"
    />
    <button data-trigger="Search" @click="search">Search</button>
    <div class="search-message-boxes">
      <span data-output="MessageSuccess" v-if="success">{{ message }}</span>
      <span data-output="MessageAlert" v-if="alert">{{ message }}</span>
    </div>
  </div>
</template>

<style scoped>
.search > .search-message-boxes {
  width: 100%;
}
</style>

<script>
import Api from '@/services/Api'

export default {
  data() {
    return {
      success: false,
      alert: false,
      criteria: '',
      message: ''
    }
  },
  methods: {
    search() {
      const self = this
      self.sucess = false
      self.alert = false
      Api.search(self.criteria).then(data => {
        if (data.result === 'available') {
          self.message = `${self.criteria} is available!`
          self.success = true
          self.alert = false
        } else {
          self.message = `
            ${self.criteria} is not available! It has ${data.result} code.
          `
          self.alert = true
          self.sucess = false
        }
      })
    }
  }
}
</script>

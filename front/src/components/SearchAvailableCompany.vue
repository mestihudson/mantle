<template>
  <div>
    <input data-input="Criteria" v-model="criteria" />
    <button data-trigger="Search" @click="search" />
    <span data-output="MessageSuccess" v-if="success">{{ message }}</span>
    <span data-output="MessageAlert" v-if="alert">{{ message }}</span>
  </div>
</template>

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
        }
        if (
          Array.isArray(data.result) &&
          data.result.length > 0
        ) {
          self.message = `${self.criteria} (${data.result[0]}) is not available!`
          self.alert = true
        }
      })
    }
  }
}
</script>

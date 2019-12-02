import Vue from 'vue'
import Resource from 'vue-resource'

Vue.use(Resource)

const URL = process.env.VUE_APP_API

export default {
  search(criteria) {
    return Vue.http.get(`${URL}/mantle-front-end-task/`, {
      params: {
        company_name: criteria,
        json: true
      },
      credentials: {
        username: 'fe_task',
        password: 'msg_feeeeee'
      }
    })
      .then((result) => Promise.resolve(result.data))
      .catch((errors) => Promise.reject(errors))
  }
}

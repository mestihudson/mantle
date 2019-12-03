import axios from 'axios'

const URL = process.env.VUE_APP_API

export default {
  search(criteria) {
    return axios
      .get(`${URL}/mantle-front-end-task/`, {
        params: {
          company_name: criteria,
          json: true
        },
        withCredentials: true,
        auth: {
          username: 'fe_task',
          password: 'msg_feeeeee'
        }
      })
      .then(result => Promise.resolve(result.data))
      .catch(errors => Promise.reject(errors))
  }
}

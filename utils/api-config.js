import axios from 'axios'

axios.interceptors.request.use(
  (config) => {
    config.headers = {
      ...config.headers,
      'X-Recharge-Access-Token': process.env.API_TOKEN
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.error({ error })

    // NOTE: log errors to Sentry or some other service here
    return Promise.reject(error)
  }
)

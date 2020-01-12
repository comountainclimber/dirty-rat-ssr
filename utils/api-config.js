import axios from 'axios'

axios.interceptors.request.use(
  (config) => {
    config.headers = {
      ...config.headers,
      'X-Recharge-Access-Token':
        'ee83012e38e48a2fd0d85a8504db125327638a53cbdbdf55e9f3b7f207843435'
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

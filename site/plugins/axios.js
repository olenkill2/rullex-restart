export default function ({ $axios, req, store }) {
  const tokens = store.getters['user/tokens']
  let isRefreshing = false
  let failedQueue = []

  const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => error ? prom.reject(error) : prom.resolve(token))
    failedQueue = []
  }

  $axios.interceptors.request.use((request) => {
    if (store.state.user.access_token) {
      request.headers.common.Authorization = `Bearer ${store.state.user.access_token}`
    }
    return request
  })

  $axios.onError((error) => {
    const originalRequest = error.config
    const tokens = store.getters['user/tokens']

    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`

          return $axios(originalRequest)
        }).catch((err) => {
            throw err
        })
      }

      originalRequest._retry = true
      isRefreshing = true

      return new Promise(function (resolve, reject) {
        $axios
          .post('http://localhost:3002/api/v1/users/refresh', { refresh_token: tokens.refresh_token })
            .then(async ({ data: tokens }) => {
              await store.dispatch('user/updateTokens', tokens)

              $axios.defaults.headers.common.Authorization = `Bearer ${tokens.access_token}`
              originalRequest.headers.Authorization = `Bearer ${tokens.access_token}`

              processQueue(null, tokens.access_token)

              resolve($axios(originalRequest))
            })
            .catch((err) => {
              processQueue(err, null)

              store.dispatch('user/logout')

              reject(error)
            })
            .finally(() => { isRefreshing = false })
      })
    }
    return error
  })
}

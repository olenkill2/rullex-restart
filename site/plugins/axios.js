export default function ({ $axios, store }) {
	$axios.interceptors.request.use(request => {

		// Get token from auth.js store
		const token = store.state.user.token

		if (token) {
			request.headers.common['Authorization'] = token
		}
		return request
	})
}
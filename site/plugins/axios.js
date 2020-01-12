export default function ({ $axios, store }) {
	$axios.interceptors.request.use(request => {

		const token = store.state.user.token
		if (token) {
			request.headers.common['Authorization'] = 'Bearer ' + token;
		}
		return request
	})
}
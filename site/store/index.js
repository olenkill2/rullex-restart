const cookieparser = process.server ? require('cookieparser') : undefined
export const state = () => ({
})

export const mutations = {
	increment (state) {
		state.counter++
	}
}
export const actions = {
	async nuxtServerInit({ commit, dispatch }, { req, res }) {
		await dispatch('menu/getMenu');

		if (req.headers.cookie) {

			const parsed = cookieparser.parse(req.headers.cookie);

			if(parsed.Authorization) {
				const token = parsed.Authorization;
				this.$axios.setHeader('Authorization', 'Bearer ' + token);
				try {
					let res = await this.$axios.post('http://127.0.0.1:3002/api/v1/users/signin-token');
					dispatch('user/auth', res.data);
				} catch (error) {
					// res.setHeader('Set-Cookie', [`Authorization=false; expires=Thu, 01 Jan 1970 00:00:00 GMT`])
					dispatch('user/logout', res.data)
				}
			}
		}
	}
};
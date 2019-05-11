const cookieparser = process.server ? require('cookieparser') : undefined
export const state = () => ({
})

export const mutations = {
	increment (state) {
		state.counter++
	}
}
export const actions = {
	async nuxtServerInit({ commit }, { req }) {
		if (req.headers.cookie) {

			const parsed = cookieparser.parse(req.headers.cookie);

			if(parsed.authorization) {
				const token = parsed.authorization;
				this.$axios.setHeader('Authorization', token);
				try {
					let res = await this.$axios.post('http://127.0.0.1:3002/signin-token');
					await commit('user/setAuth', res.data)
				} catch (error) {
					console.log('error');
				}
			}
		}
	}
};
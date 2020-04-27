const cookieparser = process.server ? require('cookieparser') : undefined
export const state = () => ({
})

export const mutations = {
}
export const actions = {
  async nuxtServerInit({ commit, dispatch }, { req, app }) {
	  await dispatch('menu/getMenu');

    const tokens = {
      access_token: app.$cookies.get('access_token') || null,
      refresh_token: app.$cookies.get('refresh_token') || null
    }

    if(tokens.access_token && tokens.refresh_token) {
      await dispatch('user/updateTokens', tokens)
      try {
        await dispatch('user/getUser')
      } catch (e) {
        console.log(e)
      }
		}
	}
};

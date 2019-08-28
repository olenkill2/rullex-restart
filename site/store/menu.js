export const state = () => ({
	items: [],
})

export const mutations = {
	setMenu(state, menu) {
		console.log(menu);
		state.items = menu;
	},
}

export const actions = {
	async getMenu({ commit }) {
		try {
			let res = await this.$axios.get('http://127.0.0.1:3002/menu/public');
			let menuArray = {withoutCategory: {name: 'none', items: []}};

			for(var link of res.data.data)
			{
				if(link.category == null)
					menuArray.withoutCategory.items.push(link)
				else
				{
					if(typeof menuArray[link.category.category] == 'undefined')
					{
						menuArray[link.category.category] = {name: link.category.category, open: false, items: []};
					}
					menuArray[link.category.category].items.push(link);
				}
			}

			commit('setMenu', menuArray);
		} catch (error) {
			console.log(error);
		}
	}
};
<template lang="pug">
	.page-content
		.pages-wr
			.pages-header
				.pages-header__left
					|Всего в меню - {{menuItems.length}} пунктов
				.pages-header__right
					button.btn.btn_small(v-if="!menuFormShow", @click="menuFormShow = !menuFormShow", :class="{'btn_skin': menuFormShow}")
						|Добавить
					button.btn.btn_small(v-else="", @click="cancelEdit", :class="{'btn_skin': menuFormShow}")
						|Отменить

			.pages-form-wr(v-if="menuFormShow")
				.pages-form-groups
					.pages-form-groups__item
						.pages-form-groups-field-wr
							field(v-model="menu.url", label="Url", type="text", rules="required")

						.pages-form-groups-field-wr
							field(v-model="menu.label", label="Заголовок", type="text", rules="required")

						.pages-form-groups-field-wr
							checkbox(v-model="menu.private", label="Приватная", name="private")

					.pages-form-groups__item
						.pages-form-groups-field-wr
							field(v-model="menu.order", label="Порядковый номер", type="text", rules="required")

						.pages-form-groups-field-wr
							field(v-model="menu.category", label="Категория", type="text")

				.pages-form-actions(v-if="!edit")
					.pages-form-actions__item
						button.btn.btn_small.btn_red(@click="clearForm") Очистить
					.pages-form-actions__item
						button.btn.btn_small.btn_accent(@click="addMenu") Добавить

				.pages-form-actions(v-else="")
					.pages-form-actions__item
						button.btn.btn_small.btn_red(@click="deleteMenu") Удалить рулетку
					.pages-form-actions__item
						button.btn.btn_small.btn_accent(@click="updateMenu") Сохранить

			.page-data-container
				.pages-message(v-if="!menuItems.length")
					|Меню пустое

				table.dashboard-table(v-else="")
					tbody
						tr
							th №
							th URL
							th Заголовок
							th Категория
							th Порядковый номер
							th Приватная
							th Редактирование
						tr(v-for="(menuItem, index) in menuItems")
							td {{index + 1}}
							td {{menuItem.url}}
							td {{menuItem.label}}
							td {{menuItem.category}}
							td {{menuItem.order}}
							td
								span(v-if="menuItem.private") Да
								span(v-else="") Нет
							td
								.edit-field.edit-field_roulette(@click="setMenuForEdit(index)")
</template>

<script>
import field from '~/components/input';
import dropdown from '~/components/drop-down';
import checkbox from '~/components/checkbox';
import textField from '~/components/textarea';
export default {
	async asyncData ({$axios, redirect, res, route}) {
		try {
			let menuItems = await $axios.get(process.env.baseUrl + '/menu');

			return await { menuItems: menuItems.data.data };
		} catch (err) {
			return await { menuItems: [] };
		}
	},
	layout (context) {
		return 'dashboard'
	},
	name: 'seo',
	middleware: ['authenticated'],
	components: {
		field,
		checkbox,
		dropdown,
		textField
	},
	data: () => ({
		menuItems: [],
		menu: {},
		menuFormShow: false,
		seo: {},
		edit: false,
		error: false,
	}),
	computed: {
	},
	methods: {
		getMenuItems () {
			this.$axios.get('/api/menu').then((response) => {
				this.menuItems = response.data.data
			}).catch((error) => { this.menuItems = [];})
		},

		getMenuSchema () {
			return {
				slug: '',
				title: '',
				url: '',
				order: '',
				category: '',
				private: true
			}
		},

		setMenuForEdit (index) {
			this.edit = true;
			this.menu = JSON.parse(JSON.stringify(this.menuItems[index]));
			this.menuFormShow = true;
		},

		clearForm () {
			this.menu = this.getMenuSchema();
		},

		cancelEdit () {
			this.menu = this.getMenuSchema();
			this.edit = false;
			this.menuFormShow = false;
		},

		addMenu () {
			this.$axios.post('/api/menu', this.menu).then((response, error) => {
				this.getMenuItems();
				this.cancelEdit();
			}).catch((error, res) => {
				// this.addseoErrors = error;
			})
		},

		deleteMenu () {
			this.$axios.delete('/api/menu/' + this.menu._id).then((response, error) => {
				this.getMenuItems();
				this.cancelEdit();
			}).catch((error, res) => {
				this.error = true;
			})
		},

		updateMenu () {
			this.$axios.put('/api/menu/' + this.menu._id, this.menu).then((response, error) => {
				this.getMenuItems();
				this.cancelEdit();
			}).catch((error) => {
				console.log(error);

				this.error = true;
			});
		}
	},
	created () {
		this.menu = this.getMenuSchema();
	}
}
</script>

<style lang="scss">

</style>

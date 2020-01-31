<template lang="pug">
	.page-content
		.pages-wr
			.pages-header
				.pages-header__left
					|Всего акций или халяв - {{seoItems.length}}
				.pages-header__right
					button.btn.btn_small(v-if="!seoFormShow", @click="seoFormShow = !seoFormShow", :class="{'btn_skin': seoFormShow}")
						|Добавить
					button.btn.btn_small(v-else="", @click="cancelEdit", :class="{'btn_skin': seoFormShow}")
						|Отменить

			.pages-form-wr(v-if="seoFormShow")
				.pages-form-groups
					.pages-form-groups__item
						.pages-form-groups-field-wr
							field(v-model="seo.slug", label="Page slug", type="text", rules="required")

						.pages-form-groups-field-wr
							field(v-model="seo.title", label="Title", type="text", rules="required")

						.pages-form-groups-field-wr
							text-field(v-model="seo.description", label="Description", type="text", rules="required")

						.pages-form-groups-field-wr
							field(v-model="seo.ogImg", label="img url", type="text")

						.pages-form-groups-field-wr
							checkbox(v-model="seo.private", label="Приватная", name="private")

					.pages-form-groups__item
						.pages-form-groups-field-wr
							text-field(v-model="seo.keywords", label="keywords", type="text")

						.pages-form-groups-field-wr
							field(v-model="seo.ogTitle", label="og title", type="text")
						.pages-form-groups-field-wr
							text-field(v-model="seo.ogDescription", label="og description", type="text")

						.pages-form-groups-field-wr
							field(v-model="seo.pageType", label="Тип страницы", type="text")


				.pages-form-actions(v-if="!edit")
					.pages-form-actions__item
						button.btn.btn_small.btn_red(@click="clearForm") Очистить
					.pages-form-actions__item
						button.btn.btn_small.btn_accent(@click="addSeo") Добавить

				.pages-form-actions(v-else="")
					.pages-form-actions__item
						button.btn.btn_small.btn_red(@click="deleteSeo") Удалить рулетку
					.pages-form-actions__item
						button.btn.btn_small.btn_accent(@click="updateSeo") Сохранить

			.page-data-container
				.pages-message(v-if="!seoItems.length")
					|Акций пока нет

				table.dashboard-table(v-else="")
					tbody
						tr
							th №
							th Заголовок
							th Описание
							th Тип
							th Приватная
							th Редактирование
						tr(v-for="(seo, index) in seoItems")
							td {{index + 1}}
							td {{seo.title}}
							td {{seo.description}}
							td {{seo.pageType}}
							td
								span(v-if="seo.private") Да
								span(v-else="") Нет
							td
								.edit-field.edit-field_roulette(@click="setSeoForEdit(index)")
</template>

<script>
export default {
	async asyncData ({$axios, redirect, res, route}) {
		try {
			let seoItems = await $axios.get(process.env.baseUrl + '/seo');

			return await { seoItems: seoItems.data.data };
		} catch (err) {
			return await { seoItems: [] };
		}
	},
	layout (context) {
		return 'dashboard'
	},
	name: 'seo',
	middleware: ['authenticated'],
	data: () => ({
		seoItems: [],
		seoFormShow: false,
		roulettes: [],
		seo: {},
		statusList: ['private', 'work', 'end'],
		edit: false,
		error: false,
	}),
	computed: {
	},
	methods: {
		getSeoItems () {
			this.$axios.get('/api/seo').then((response) => {
				this.seoItems = response.data.data
			}).catch((error) => { this.seoItems = [];})
		},

		getSeoSchema () {
			return {
				slug: '',
				title: '',
				description: '',
				pageType: '',
				keywords: '',
				ogTitle: '',
				ogDescription: '',
				ogImg: '',
				private: true
			}
		},

		setSeoForEdit (index) {
			this.edit = true;
			this.seo = JSON.parse(JSON.stringify(this.seoItems[index]));
			this.seoFormShow = true;
		},

		clearForm () {
			this.seo = this.getSeoSchema();
		},

		cancelEdit () {
			this.seo = this.getSeoSchema();
			this.edit = false;
			this.seoFormShow = false;
		},

		addSeo () {
			this.$axios.post('/api/seo', this.seo).then((response, error) => {
				this.getSeoItems();
				this.cancelEdit();
			}).catch((error, res) => {
				// this.addseoErrors = error;
			})
		},

		deleteSeo () {
			this.$axios.delete('/api/seo/' + this.seo._id).then((response, error) => {
				this.getSeoItems();
				this.cancelEdit();
			}).catch((error, res) => {
				this.error = true;
			})
		},

		updateSeo () {
			this.$axios.put('/api/seo/' + this.seo._id, this.seo).then((response, error) => {
				this.getSeoItems();
				this.cancelEdit();
			}).catch((error) => {
				console.log(error);

				this.error = true;
			});
		}
	},
	created () {
		this.seo = this.getSeoSchema();
	}
}
</script>

<style lang="scss">

</style>

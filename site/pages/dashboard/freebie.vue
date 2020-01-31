<template lang="pug">
	.page-content
		.pages-wr
			.pages-header
				.pages-header__left
					|Всего акций или халяв - {{freebies.length}}
				.pages-header__right
					button.btn.btn_small(v-if="!freebieFormShow", @click="freebieFormShow = !freebieFormShow", :class="{'btn_skin': freebieFormShow}")
						|Добавить
					button.btn.btn_small(v-else="", @click="cancelEdit", :class="{'btn_skin': freebieFormShow}")
						|Отменить

			.pages-form-wr(v-if="freebieFormShow")
				.pages-form-groups
					.pages-form-groups__item
						.pages-form-groups-field-wr
							field(v-model="freebie.title", label="Заголовок", type="text", rules="required")

						.pages-form-groups-field-wr
							text-field(v-model="freebie.description", label="Описание", type="text", rules="required")

						.pages-form-groups-field-wr
							field(v-model="freebie.type", label="Тип бонуса", type="text", rules="required")

						.pages-form-groups-field-wr
							field(v-model="freebie.profit", label="Размер бонуса", type="text", rules="required")

					.pages-form-groups__item
						.pages-form-groups-field-wr
							field(v-model="freebie.timeToEnd", label="Дата окончания", type="text")

						.pages-form-groups-field-wr
							dropdown(v-model="freebie.status", :list="statusList" label="Состояние", type="text", rules="required")

						.pages-form-groups-field-wr
							dropdown(v-model="freebie.roulette", :list="roulettes" label="Рулетка", type="text", rules="required")
								template(v-slot:selected="item")
									|{{item.current.name}}

								template(v-slot:items="item")
									|{{item.item.name}}

				.pages-form-actions(v-if="!edit")
					.pages-form-actions__item
						button.btn.btn_small.btn_red(@click="clearForm") Очистить
					.pages-form-actions__item
						button.btn.btn_small.btn_accent(@click="addFreebie") Добавить

				.pages-form-actions(v-else="")
					.pages-form-actions__item
						button.btn.btn_small.btn_red(@click="deleteFreebie") Удалить рулетку
					.pages-form-actions__item
						button.btn.btn_small.btn_accent(@click="updateFreebie") Сохранить

			.page-data-container
				.pages-message(v-if="!freebies.length")
					|Акций пока нет

				table.dashboard-table(v-else="")
					tbody
						tr
							th №
							th Заголовок
							th Описание
							th Рулетка
							th Тип
							th Профит
							th Время окончания
							th Статус
							th Редактирование
						tr(v-for="(freebie, index) in freebies")
							td {{index + 1}}
							td {{freebie.title}}
							td {{freebie.description}}
							td {{freebie.roulette.name}}
							td {{freebie.type}}
							td {{freebie.profit}} {{freebie.roulette.currency.symbol}}
							td {{freebie.timeToEnd}}
							td {{freebie.status}}
							td
								.edit-field.edit-field_roulette(@click="setFreebieForEdit(index)")
</template>

<script>
export default {
	async asyncData ({$axios, redirect, res, route}) {
		try {
			let freebies = await $axios.get(process.env.baseUrl + '/freebies');
			let roulettes = await $axios.get(process.env.baseUrl + '/roulettes');

			return await { freebies: freebies.data.data, roulettes: roulettes.data.data};
		} catch (err) {
			return await { freebies: [], roulettes: []};
		}
	},
	layout (context) {
		return 'dashboard'
	},
	name: 'freebie',
	middleware: ['authenticated'],
	data: () => ({
		freebies: [],
		freebieFormShow: false,
		roulettes: [],
		freebie: {},
		statusList: ['private', 'work', 'end'],
		edit: false,
		error: false,
	}),
	computed: {
	},
	methods: {
		getFreebies () {
			this.$axios.get('/api/freebies').then((response) => {
				this.freebies = response.data.data
			}).catch((error) => { this.freebies = [];})
		},

		getFreebieSchema () {
			return {
				title: '',
				description: '',
				type: '',
				profit: 0,
				roulette: {},
				timeToEnd: '',
				status: '',
			}
		},

		setFreebieForEdit (index) {
			this.edit = true;
			this.freebie = JSON.parse(JSON.stringify(this.freebies[index]));
			this.freebieFormShow = true;
		},

		clearForm () {
			this.freebie = this.getFreebieSchema();
		},

		cancelEdit () {
			this.freebie = this.getFreebieSchema();
			this.edit = false;
			this.freebieFormShow = false;
		},

		addFreebie () {
			this.$axios.post('/api/freebies', this.freebie).then((response, error) => {
				this.getFreebies();
				this.cancelEdit();
			}).catch((error, res) => {
				// this.addfreebieErrors = error;
			})
		},

		deleteFreebie () {
			this.$axios.delete('/api/freebies/' + this.freebie._id).then((response, error) => {
				this.getFreebies();
				this.cancelEdit();
			}).catch((error, res) => {
				console.log(error);

				this.error = true;
			})
		},

		updateFreebie () {
			this.$axios.put('/api/freebies/' + this.freebie._id, this.freebie).then((response, error) => {
				this.getFreebies();
				this.cancelEdit();
			}).catch((error) => {
				console.log(error);

				this.error = true;
			});
		}
	},
	created () {
		this.freebie = this.getFreebieSchema();
	}
}
</script>

<style lang="scss">

</style>

<template>
	<div class="page-content">
    <div class="pages-wr">
      <div class="pages-header">
        <div class="pages-header__left">Всего в меню - {{menuItems.length}} пунктов</div>
        <div class="pages-header__right">
          <button class="btn btn_small" v-if="!menuFormShow" @click="menuFormShow = !menuFormShow" :class="{'btn_skin': menuFormShow}">Добавить</button>
          <button class="btn btn_small" v-else="" @click="cancelEdit" :class="{'btn_skin': menuFormShow}">Отменить</button>
        </div>
      </div>
      <div class="pages-form-wr" v-if="menuFormShow">
        <div class="pages-form-groups">
          <div class="pages-form-groups__item">
            <div class="pages-form-groups-field-wr">
              <field v-model="menu.url" label="Url" type="text" rules="required"></field>
            </div>
            <div class="pages-form-groups-field-wr">
              <field v-model="menu.label" label="Заголовок" type="text" rules="required"></field>
            </div>
            <div class="pages-form-groups-field-wr">
              <checkbox v-model="menu.private" label="Приватная" name="private"></checkbox>
            </div>
          </div>
          <div class="pages-form-groups__item">
            <div class="pages-form-groups-field-wr">
              <field v-model="menu.order" label="Порядковый номер" type="text" rules="required"></field>
            </div>
            <div class="pages-form-groups-field-wr">
              <field v-model="menu.category" label="Категория" type="text"></field>
            </div>
          </div>
        </div>
        <div class="pages-form-actions" v-if="!edit">
          <div class="pages-form-actions__item">
            <button class="btn btn_small btn_red" @click="clearForm">Очистить</button>
          </div>
          <div class="pages-form-actions__item">
            <button class="btn btn_small btn_accent" @click="addMenu">Добавить</button>
          </div>
        </div>
        <div class="pages-form-actions" v-else="">
          <div class="pages-form-actions__item">
            <button class="btn btn_small btn_red" @click="deleteMenu">Удалить рулетку</button>
          </div>
          <div class="pages-form-actions__item">
            <button class="btn btn_small btn_accent" @click="updateMenu">Сохранить</button>
          </div>
        </div>
      </div>
      <div class="page-data-container">
        <div class="pages-message" v-if="!menuItems.length">Меню пустое</div>
        <table class="dashboard-table" v-else="">
          <tbody>
            <tr>
              <th>№</th>
              <th>URL</th>
              <th>Заголовок</th>
              <th>Категория</th>
              <th>Порядковый номер</th>
              <th>Приватная</th>
              <th>Редактирование</th>
            </tr>
            <tr v-for="(menuItem, index) in menuItems">
              <td>{{index + 1}}</td>
              <td>{{menuItem.url}}</td>
              <td>{{menuItem.label}}</td>
              <td>{{menuItem.category}}</td>
              <td>{{menuItem.order}}</td>
              <td><span v-if="menuItem.private">Да</span><span v-else="">Нет</span></td>
              <td>
                <div class="edit-field edit-field_roulette" @click="setMenuForEdit(index)"></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
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

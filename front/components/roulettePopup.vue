<!-- <template lang="pug">
	.popup-box
		.popup-box__layout
		.popup.popup_link
			.popup-top
				.popup-top__header
					|Управление рулетками
				.popup-top__close(@click="close")
					img(src="~/assets/icons/close.svg")

			.popup-body
				field.popup-link__field(v-model="rouletteData.name", label="Название")
				field.popup-link__field(v-model="rouletteData.url", label="Url")
				label.checkbox-label-wr
					checkbox(v-model="rouletteData.private")
					span.label-text
						|Приватная
				dropdown(:list="modesList", label="Режим", @select="setMode")
				text-field(v-model="rouletteData.authValidationRuleFunction", label="Функция валидации")
				text-field(v-model="rouletteData.balanceParseFunction", label="Функция сбора баланса")
				text-field(v-model="rouletteData.balanceParseFunction", label="Функция сбора баланса")
				//- category.popup-link__field(@select="selectCategory", :selected="editData")
				//- field.popup-link__field(v-model="rouletteData.order", label="Вес")

			.popup-footer
				button.btn.btn_red.popup-footer__btn(v-if="edit", @click="removeItem")
					|Удалить
				button.btn.popup-footer__btn(v-if="edit", @click="updateItem")
					|Изменить
				button.btn.btn_accent.popup-footer__btn(v-if="!edit", @click="addNewItem")
					|Добавить
</template>
<script>
import field from '~/components/input';
import dropdown from '~/components/drop-down';
import textField from '~/components/textarea';
import category from '~/components/categorys';
import checkbox from '~/components/checkbox';

export default {
	props: ['opened', 'editData'],
	components: {
		field,
		category,
		checkbox,
		textField,
		dropdown
	},
	data: () => ({
		rouletteData: {
			name: '',
			url: '',
			authValidationRuleFunction: '',
			balanceParseFunction: '',
			gameFunction: '',
			gameFunctionForMode: {
				modeName: '',
				function: ''
			},
			order: '',
			private: false,
		},
		selectedCategory: '',
		error: false,
		model: '',
		modesList: '',
	}),
	methods: {
		close () {
			this.$emit('close');
		},
		addNewItem () {
			// this.$axios.post('/api/menu', this.rouletteData).then((result, error) => {
			// 	this.$emit('update');
			// 	this.close();
			// }).catch((error) => {
			// 	this.error = true;
			// })
		},
		selectCategory (category) {
			// if(category != null)
			// 	this.rouletteData.category = category;
			// else
			// 	this.rouletteData.category = null
		},
		updateItem () {
			// this.$axios.put('/api/menu', {link: this.rouletteData}).then((result, error) => {
			// 	this.$emit('update');
			// 	this.close();
			// }).catch((error) => {
			// 	this.error = true;
			// });
		},
		removeItem () {
			// this.$axios.delete('/api/menu', {data: {link: this.rouletteData}}).then((result, error) => {
			// 	this.$emit('update');
			// 	this.close();
			// }).catch((error) => {
			// 	this.error = true;
			// })
		},
		setMode () {

		}
	},
	computed: {
		edit () {
			if(this.editData)
			{
				this.rouletteData = {...this.editData};
				return true;
			}
			return false;
		},
	},
	mounted () {
		// this.$axios.get('/api/modes').then((result, error) => {
		// 	this.modesList = result.data.data;
		// }).catch((error) => {
		// 	this.modesList = [];
		// }
	},
}
</script>
<style lang="scss">
	@import '~/assets/style/variables.scss';
	.popup-box
	{
		position: fixed;
		z-index: 30;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		// background-color: rgba($accent, 0.4);
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.popup-box__layout
	{
		position: fixed;
		z-index: 29;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		background-color: rgba($accent, 0.4);
	}
	.popup
	{
		margin-left: auto;
		margin-right: auto;
		background-color: #fff;
		box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
		border-radius: 4px;
		text-align: left;
		padding: 25px;
		padding-right: 20px;
		padding-bottom: 0;
		min-width: 300px;
		position: relative;
		z-index: 30;
	}
	.popup-top
	{
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: relative;
		padding-bottom: 20px;
	}
	.popup-top__header
	{
		font-size: 24px;
		font-weight: $medium;
		color: $accent;
		margin-right: 40px;
	}
	.popup-top__close
	{
		line-height: 0;
		cursor: pointer;
		width: 28px;
		img
		{
			width: 100%;
		}
	}
	.popup-link__field
	{
		margin-bottom: 15px;
		&:last-child
		{
			margin-bottom: 0;
		}
	}
	.popup-footer
	{
		display: flex;
		justify-content: flex-end;
		align-items: center;
		padding-top: 15px;
		margin-top: 50px;
		padding-bottom: 25px;
		margin-left: -25px;
		margin-right: -20px;
		padding-left: 25px;
		padding-right: 20px;
		border-top: 1px solid #E1EEF6;
	}
	.popup-footer__btn
	{
		margin-left: 20px;
		&:first-child
		{
			margin-left: 0;
		}
	}
</style>
 -->
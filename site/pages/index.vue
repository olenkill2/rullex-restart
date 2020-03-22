<template lang="pug">
	div.page-content
		h1.page-header Rullex -- расширения для атоигры на любом сайте
		p Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.
		h2 Почему он используется?
		p Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается при простой дубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.." Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам "lorem ipsum" сразу показывает, как много веб-страниц всё ещё дожидаются своего настоящего рождения. За прошедшие годы текст Lorem Ipsum получил много версий. Некоторые версии появились по ошибке, некоторые - намеренно (например, юмористические варианты).
</template>

<script>
	export default {
		async asyncData ({$axios, redirect, res, route}) {
			try
			{
                var seo = await $axios.get('http://127.0.0.1:3002/api/v1/seo/public/', {params: {url: '/'}})

				return {seoData: seo.data.data};
			} catch(err) {
				return {
					title: 'Rullex',
					description: 'Бот для рулеток'
				};
			}
		},
		head () {
			return {
				title: this.seoData.title,
				meta: [
					{ hid: 'description', name: 'description', content: this.seoData.description },
					{ hid: 'og:title', name: 'og:title', content: this.seoData.ogTitle },
					{ hid: 'og:descriptio ', name: 'og:descriptio ', content: this.seoData.ogDescription },
				]
			}
		},
		data: () => ({
			// title: 'Rullex',
			// description: 'Бот для рулеток',
			// content: 'Расширение для рулеток'
		}),
	}
</script>

<style lang="scss">

</style>

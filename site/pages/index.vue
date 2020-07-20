<template>
  <div class="page-content">
    <h1>Заголовок перовго уровня</h1>
<!--    <h2>Заголовок второго уровня</h2>-->
<!--    <h3><a href="#">Заголовок</a> третьего уровня уровня</h3>-->
    <p><a href="#">Lorem</a> ipsum dolor sit amet, consectetur adipisicing elit. Adipisci amet animi architecto autem consectetur cumque eius itaque nobis, quasi voluptatibus! Ad laborum molestias nulla quos repudiandae, soluta tempore ullam veniam. Aliquid assumenda exercitationem qui quo rem? Culpa cupiditate debitis error fuga hic laboriosam maiores modi quam sapiente, tempore? Autem blanditiis consequatur expedita harum magni, numquam odit officiis, qui quidem quis rem sint soluta! Eveniet odit saepe vero. Alias, asperiores consequatur debitis deserunt dolore dolores facilis fugiat fugit ipsam maiores modi nulla numquam officia porro quo ratione recusandae sint sit tenetur, vero. Distinctio dolore esse illum maiores quidem, rem sapiente vel!</p>
    <ul>
      <li>Список список</li>
      <li>Список <a href="#">список</a></li>
      <li>Список <b>список</b></li>
      <li>Список <i>список</i></li>
    </ul>

    <hr>
<!--    <h1>Заголовок перовго уровня</h1>-->
    <h2>Заголовок второго уровня</h2>
<!--    <h3>Заголовок третьего уровня уровня</h3>-->
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci amet animi architecto autem consectetur cumque eius itaque nobis, quasi voluptatibus! Ad laborum molestias nulla quos repudiandae, soluta tempore ullam veniam. Aliquid assumenda exercitationem qui quo rem? Culpa cupiditate debitis error fuga hic laboriosam maiores modi quam sapiente, tempore? Autem blanditiis consequatur expedita harum magni, numquam odit officiis, qui quidem quis rem sint soluta! Eveniet odit saepe vero. Alias, asperiores consequatur debitis deserunt dolore dolores facilis fugiat fugit ipsam maiores modi nulla numquam officia porro quo ratione recusandae sint sit tenetur, vero. Distinctio dolore esse illum maiores quidem, rem sapiente vel!</p>
    <ul>
      <li>Список список</li>
      <li>Список список</li>
      <li>Список список</li>
      <li>Список список</li>
    </ul>
    <hr>
    <!--    <h1>Заголовок перовго уровня</h1>-->
<!--    <h2>Заголовок второго уровня</h2>-->
    <h3>Заголовок третьего уровня уровня</h3>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci amet animi architecto autem consectetur cumque eius itaque nobis, quasi voluptatibus! Ad laborum molestias nulla quos repudiandae, soluta tempore ullam veniam. Aliquid assumenda exercitationem qui quo rem? Culpa cupiditate debitis error fuga hic laboriosam maiores modi quam sapiente, tempore? Autem blanditiis consequatur expedita harum magni, numquam odit officiis, qui quidem quis rem sint soluta! Eveniet odit saepe vero. Alias, asperiores consequatur debitis deserunt dolore dolores facilis fugiat fugit ipsam maiores modi nulla numquam officia porro quo ratione recusandae sint sit tenetur, vero. Distinctio dolore esse illum maiores quidem, rem sapiente vel!</p>
    <ul>
      <li>Список список</li>
      <li>Список список</li>
      <li>Список список</li>
      <li>Список список</li>
    </ul>
  </div>
</template>

<script>
  export default {
    // async asyncData({ $axios, store }) {
    //   try
    //   {
    //     const seo = await $axios.get('http://127.0.0.1:3002/api/v1/seo/public/', {params: {url: '/'}})
    //
    //     return {seoData: seo.data.data};
    //   } catch(err) {
    //     console.log(err)
    //     return {
    //       title: 'Rullex',
    //       description: 'Бот для рулеток'
    //     };
    //   }
    // },
    head() {
      // return {
      //  title: this.seoData.title,
      //  meta: [
      //    { hid: 'description', name: 'description', content: this.seoData.description },
      //    { hid: 'og:title', name: 'og:title', content: this.seoData.ogTitle },
      //    { hid: 'og:description', name: 'og:description', content: this.seoData.ogDescription },
      //  ]
      // }
    },
    data() {
      return {

      }
    }
  }
</script>

<style lang="scss">

</style>

<template lang="pug">
    div.page-content.page-oauth-description
        .page-oauth-wait(v-if="loading")
            h1.page-content__header Проверяем что и как, <br> подожди чуть-чуть
            //- .page-oauth-description
            //-     | lorem
        .page-oauth-error(v-if="error")
            | Что-то пошло не так попробуйте иначе
</template>

<script>
import { mapActions } from 'vuex';
export default {
    loyout: 'none',
    data() {
        return {
            error: false,
            loading: true
        }
    },
    methods: {
        ...mapActions({ auth: 'user/auth'}),
    },
    async mounted() {
        // if(this.$store.state.user.auth)
        //     return this.$router.push('/');
        //
            // const result = await this.$axios.get('/api/users/oauth/' + this.$route.query.from, {params: {code: this.$route.query.code}})
        //     const pageCountToRedirect = this.$route.query.from == 'google' ? -2 : -1;
        //
        //     this.auth(result.data);
        //
        //     return this.$router.go(pageCountToRedirect);
        // } catch (error) {
        //     this.loading = false;
        //     this.error = true;
        // }
        // try {
        // const result = await this.$axios.get('/api/users/oauth/vk')
    }
}
</script>

<style lang="scss">
    .page-content-auth
    {
        text-align: center;
    }
    .page-oauth-description
    {
        text-align: center;
    }
    .page-oauth-error
    {
        font-size: 26px;
        color: $red;
    }
</style>

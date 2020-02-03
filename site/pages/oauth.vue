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
export default {
    loyout: 'none',
    data() {
        return {
            error: false,
            loading: true
        }
    },
    async mounted() {
        if(this.$store.state.user.auth)
            return this.$router.push('/');

        try {
            const result = await this.$axios.get('/api/users/oauth/' + this.$route.query.from, {params: {code: this.$route.query.code}})
            const pageCountToRedirect = this.$route.query.from == 'google' ? -2 : -1;
            return this.$router.go(pageCountToRedirect);
        } catch (error) {
            this.loading = false;
            this.error = true;
        }
        // if(a.data)
        // {
        //     console.log(a.data);
        //     // this.$router.back();
        // }

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
<template>
    <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo odit magnam non dolorem ab enim eius accusamus animi nemo eligendi perferendis alias adipisci saepe obcaecati natus, ut veniam, voluptatibus ducimus.
    </div>
</template>

<script>
export default {
    loyout: 'none',
    async mounted() {
        console.log(this.$router);
        const a = await this.$axios.get('/api/users/auth/vkontakte/callback', {params: {code: this.$route.query.code}})
        if(a.data.profile)
        {
            console.log(a.data.profile);

            // this.$router.back()

        }

    }
}
</script>

<style>

</style>
<template lang="pug">
    .img-wr
        picture
            img(:src="this.block.data.file.url")
        .img-caption {{this.block.data.caption}}
</template>

<script>
export default {
    props: ['block'],
    data() {
        return {}
    },
}
</script>

<style lang="scss">
    .img-wr
    {
        img
        {
            max-width: 100%;
        }
    }
</style>
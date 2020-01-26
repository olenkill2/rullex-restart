<template lang="pug">
    .sidebar-nav-group
        //- |{{opened}}
        .sidebar-nav-group__item
            .sidebar-nav-group__label(:class="{'sidebar-nav-group_open': opened }", @click="opened = !opened")
                span.sidebar-nav-group__label-icon
                    svg(width='7', height='13', viewBox='0 0 7 13', fill='none', xmlns='http://www.w3.org/2000/svg')
                        path(d='M6.828 6.24L.695.109a.367.367 0 0 0-.52 0 .367.367 0 0 0 0 .52L6.045 6.5l-5.87 5.87a.37.37 0 1 0 .259.63.359.359 0 0 0 .258-.109l6.133-6.133a.366.366 0 0 0 .003-.517z', fill='#62677D')
                span.sidebar-nav-group__label-text
                    |{{label}}
            .sidebar-nav-group__list(v-for="subItem of items")
                router-link.sidebar-nav-item.sidebar-nav-item_sub(:to="subItem.url") {{subItem.label}}
</template>

<script>
export default {
    props: ['label', 'items'],
    data () {
        return {
            opened: false,
        }
    },
    computed: {
        // childIsCurrentRoute() {
        //     return
        // }
    },
    created() {
        this.opened = this.items.some(item => item.url == this.$route.path);
    }
}
</script>

<style lang="scss">

</style>
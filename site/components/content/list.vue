<script>
    export default {
        props: ['block'],
        data() {
            return {}
        },
        render(createElement) {
            const tag = this.block.data.style == 'ordered' ? 'ol' : 'ul';

            return createElement(tag, this.block.data.items.map(function (item) {
                return createElement('li', item)
            }))
        }
    }
</script>
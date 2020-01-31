<script>
    export default {
        props: ['block'],
        data() {
            return {}
        },
        render(createElement) {
            return createElement('p', {
                domProps: {
                    innerHTML: this.block.data.text
                }
            });
        }
    }
</script>
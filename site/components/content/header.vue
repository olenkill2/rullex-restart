<script>
    export default {
        props: ['block'],
        data() {
            return {}
        },
        render(createElement) {
            const tag = `h${this.block.data.level}`;
            return createElement(tag, {
                attrs: {
                    class: `content-header content-header_${this.block.data.level}`
                }
            }, this.block.data.text);
        }
    }
</script>
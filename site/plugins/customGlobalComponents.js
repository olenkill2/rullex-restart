import Vue from 'vue';
import field from '~/components/input'
import dropdown from '~/components/drop-down';
import checkbox from '~/components/checkbox';
import textField from '~/components/textarea';

const components = {
    field,
    dropdown,
    checkbox,
    textField
}

Object.entries(components).forEach(([name, component]) => {
    Vue.component(name, component)
});
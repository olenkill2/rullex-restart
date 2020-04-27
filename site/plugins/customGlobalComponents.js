import Vue from 'vue';
import field from '~/components/UI/Field'
import dropdown from '~/components/UI/DropDown';
import checkbox from '~/components/UI/Checkbox';
import textField from '~/components/UI/FieldTextarea';

const components = {
    field,
    dropdown,
    checkbox,
    textField
}

Object.entries(components).forEach(([name, component]) => {
    Vue.component(name, component)
});

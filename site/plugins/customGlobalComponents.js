import Vue from 'vue';
import { extend, ValidationProvider } from 'vee-validate'
import field from '~/components/UI/Field'
import dropdown from '~/components/UI/DropDown';
import checkbox from '~/components/UI/Checkbox';
import textField from '~/components/UI/FieldTextarea';

const components = {
    field,
    dropdown,
    checkbox,
    textField,
    ValidationProvider
}

Object.entries(components).forEach(([name, component]) => {
    Vue.component(name, component)
});

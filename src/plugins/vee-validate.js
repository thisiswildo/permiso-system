import Vue from 'vue'
import { extend, localize, ValidationObserver, ValidationProvider } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import ValidatorEs from 'vee-validate/dist/locale/es'

localize('es', ValidatorEs);

Object.keys(rules).forEach(rule => {
    extend(rule, rules[rule]);
});

extend('confirmed', {
    params: ['target'],
    validate(value, { target }) {
        return value === target;
     },
    message: 'El campo {_field_} no coincide con el campo {target}'
});

extend('is_not', {
    params: ['target'],
    validate(value, { target }) {
        return value !== target;
    },
    message: 'El campo {_field_} no puede ser igual al campo {target}'
});

Vue.component('v-observer', ValidationObserver);
Vue.component('v-provider', ValidationProvider);
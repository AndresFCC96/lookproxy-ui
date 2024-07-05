<template>
    <div class="card">
        <div class="card-body">
            <h3 class="card-title">{{ title }}</h3>
            Seleccione los campos que desea filtrar
            <Multiselect v-model="filters" :options="options" mode="tags" :search="true"></Multiselect>
            <div class="separator my-3"></div>
            <div class="row">
                <div class="col-md-6 col-sm-12">
                    <div class="mb-2">
                        <div class="form-check form-check-custom form-check-solid">
                            <input v-model="openAccess" class="form-check-input" type="checkbox" value="" id="chkOpenAccess" v-on:change="sendDataFilter()">
                            <label class="form-check-label" for="chkOpenAccess">Open Access?</label>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-sm-12">
                    <div class="mb-2">
                        <div class="form-check form-check-custom form-check-solid">
                            <input v-model="actives" class="form-check-input" type="checkbox" value="" id="chkActives" v-on:change="sendDataFilter()">
                            <label class="form-check-label" for="chkActives">Solo activas</label>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-sm-12">
                    <div class="mb-2">
                        <div class="form-check form-check-custom form-check-solid">
                            <input v-model="anonymous" class="form-check-input" type="checkbox" value="" id="chkAnonymous" v-on:change="sendDataFilter()">
                            <label class="form-check-label" for="chkAnonymous">Incluir Anonimos?</label>
                        </div>
                    </div>
                </div>
                <!-- <div class="col-md-6 col-sm-12">
                    <div class="mb-2">
                        <div class="form-check form-check-custom form-check-solid">
                            <input v-model="filesDocument" class="form-check-input" type="checkbox" value="" id="chkFilesDocuments">
                            <label class="form-check-label" for="chkFilesDocuments">Archivos de Documentos?</label>
                        </div>
                    </div>
                </div> -->
            </div>
            <div class="row">
                <div class="col-12">
                    Fecha desde
                    <div class="input-group">
                        <select class="form-select" aria-label="Select example" v-model="typeSelectDate" v-on:change="sendDataFilter()">
                            <option v-for="item in optionsDate" :value="item.value" v-bind:key="item.value">{{ item.label }}</option>
                        </select>
                        <span class="input-group-text" id="basic-addon3" v-if="typeSelectDate == 0">Inicio de:</span>
                        <select class="form-select" v-model="beginDate" v-if="typeSelectDate == 0" v-on:change="sendDataFilter()">
                            <option v-for="item in optionsRelativeDate" :value="item.id" v-bind:key="item.id">{{ item.label }}</option>
                        </select>
                        <VueDatePicker class="form-control form-control-sm" v-model="beginDateText" :auto-apply=true :format="formatDate" placeholder="Seleccione la fecha" v-if="typeSelectDate == 1" v-on:update:model-value="sendDataFilter()"></VueDatePicker>
                    </div>
                </div>
                <div class="col-12">
                    Fecha hasta
                    <div class="input-group">
                        <select class="form-select" aria-label="Select example" v-model="typeSelectDate" v-on:change="sendDataFilter()">
                            <option v-for="item in optionsDate" :value="item.value" v-bind:key="item.value">{{ item.label }}</option>
                        </select>
                        <span class="input-group-text" id="basic-addon3" v-if="typeSelectDate == 0">Final de:</span>
                        <select class="form-select" v-model="endDate" v-if="typeSelectDate == 0" v-on:change="sendDataFilter()">
                            <option v-for="item in optionsRelativeDate" :value="item.id" v-bind:key="item.id">{{ item.label }}</option>
                        </select>
                        <VueDatePicker class="form-control form-control-sm" v-model="endDateText" :auto-apply=true :format="formatDate" placeholder="Seleccione la fecha" v-if="typeSelectDate == 1" v-on:update:model-value="sendDataFilter()"></VueDatePicker>
                    </div>
                </div>
            </div>
            <div class="separator my-4"></div>
            <!-- Aplicacion de Filtros -->
            <div v-for="(item, i) in options">
                <div v-for="(filter, j) in filters">
                    <div v-if="item.value == filter">
                        {{ item.label }}
                        <Multiselect v-model="valuesFilters[i].values" :options="item.values" mode="tags" v-on:change="sendDataFilter()"></Multiselect>
                    </div>
                </div>
            </div>
            <!-- Filtro campo tipo TEXTO
            <div class="input-group">
                <select class="form-select" aria-label="Select example" v-model="typeFilterFieldText">
                    <option v-for="item in textOperators" :value="item.value" v-bind:key="item.value">{{ item.label }}</option>
                </select>
                <input type="text" class="form-control" placeholder="Agregue un valor..."/>
            </div>
            Filtro campo tipo NUMERO
            <div class="input-group">
                <select class="form-select" aria-label="Select example" v-model="typeFilterFieldNumber">
                    <option v-for="item in logicOperators" :value="item.value" v-bind:key="item.value">{{ item.label }}</option>
                </select>
                <input type="text" class="form-control" placeholder="Agregue un valor..."/>
            </div>
            Filtro campo tipo SELECTOR
            <Multiselect v-model="optionSelectedField" :options="optionsFieldSelect" mode="tags"></Multiselect> -->
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import Multiselect from '@vueform/multiselect'
import FieldsUser from '../_mock_/FieldsUser';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const date = ref(new Date());

const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${year}-${month}-${day}`
}

const optionsMultiSelect = FieldsUser
const valuesFilters = ref()
// for (let i = 0; i < FieldsUser.length; i++) {
//     optionsMultiSelect.push({
//         label: FieldsUser[i].name,
//         type: FieldsUser[i].type,
//         value: FieldsUser[i].id,
//         values: FieldsUser[i].values
//     });
// }

const optionsDate = [
    {label : 'Fecha Relativa', value :0},
    {label : 'Fecha Especifica', value :1},
];

const logicOperators = [
    {label : 'Igual a', value : 0},
    {label : 'Diferente a', value : 1},
    {label : 'Menor que', value : 2},
    {label : 'Mayor que', value : 3},
    {label : 'Menor o igual que', value : 4},
    {label : 'Mayor o igual que', value : 5},
    {label : 'Entre', value : 6},
];

const textOperators = [
    {label : 'Igual a', value : 0},
    {label : 'Diferente a', value : 1},
    {label : 'Contiene', value : 2},
    {label : 'Inicia en', value : 3},
    {label : 'Termina en', value : 4},
];

const optionsFieldSelect = [
    {label : 'Opcion 1', value : 0},
    {label : 'Opcion 2', value : 1},
    {label : 'Opcion 3', value : 2},
    {label : 'Opcion 4', value : 3},
    {label : 'Opcion 5', value : 4},
    {label : 'Opcion 6', value : 5},
];

const optionsRelativeDate = [
    {label : 'Año antepasado', id : 0},
    {label : 'Año pasado', id : 1},
    {label : 'Este Año', id : 2},
    {label : 'Semestre Pasado', id : 3},
    {label : 'Este Semestre', id : 4},
    {label : 'Trimestre Pasado', id : 5},
    {label : 'Este Trimestre', id : 6},
    {label : 'Mes Antepasado', id : 7},
    {label : 'Mes pasado', id : 8},
    {label : 'Este Mes', id : 9},
    {label : 'Semana Antepasada', id : 10},
    {label : 'Semana Pasada', id : 11},
    {label : 'Esta Semana', id : 12},
    {label : 'Hoy', id : 13}
];

export default defineComponent({
    props: ['sendData', 'dataFilters'],
    data() {
        return {
            title : 'Filtrado',
            openAccess : false,
            actives : false,
            anonymous : false,
            filesDocument : false,
            formatDate,
            typeSelectDate: 0,
            date,
            beginDate : 8,
            endDate : 8,
            beginDateText : null,
            endDateText : null,
            optionsDate : optionsDate,
            relativeDateBegin : 0,
            filters: [],
            options: this.dataFilters,
            optionsRelativeDate : optionsRelativeDate,
            logicOperators,
            textOperators,
            typeFilterFieldText : 0,
            typeFilterFieldNumber : 0,
            optionSelectedField : null,
            optionsFieldSelect,
            valuesFilters: valuesFilters
        }
    },
    name: "Filters",
    components: {
        Multiselect,
        VueDatePicker
    },
    mounted() {
        valuesFilters.value = this.dataFilters.map( (item) => {
            return {
                "bgName": item.bgName,
                "values": []
            }
        })
    },
    methods: {
        async sendDataFilter() {
            let data = {
                openAccess : this.openAccess,
                actives : this.actives,
                anonymous : this.anonymous,
                typeSelectDate: this.typeSelectDate,
                date: this.date,
                beginDate : this.beginDate,
                endDate : this.endDate,
                beginDateText : this.beginDateText,
                endDateText : this.endDateText,
                relativeDateBegin : this.relativeDateBegin,
                filters: this.filters,
                valuesFilters: this.valuesFilters
            }
            this.sendData(data)
        },
        setValues(data) {
            console.log("adding values")
            console.log(data)
            this.openAccess = data.openAccess
            this.actives = data.actives
            this.anonymous = data.anonymous
            this.typeSelectDate = data.typeSelectDate
            this.date = data.date
            this.beginDate = data.beginDate
            this.endDate = data.endDate
            this.beginDateText = data.beginDateText
            this.endDateText = data.endDateText
            this.relativeDateBegin = data.relativeDateBegin
            this.filters = data.filters
            this.valuesFilters = data.valuesFilters
        }
    }
});
</script>
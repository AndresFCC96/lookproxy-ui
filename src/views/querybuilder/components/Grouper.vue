<template>
    <div class="card">
        <div class="card-body">
            <h3 class="card-title">{{ title }}</h3>
            Selecciona los campos de datos que serán usados para segmentar el resultado (agrupar por).<span class="badge badge-light">Hasta 3 campos</span>
            <Multiselect :max="3" v-model="groupBy" mode="tags" :options="optionsGroups" v-on:select="senDataGrouper()"></Multiselect>
            Selecciona las columnas a mostrar en el resultado.
            <Multiselect v-model="showColumns" mode="tags" :options="optionsColumns" v-on:select="senDataGrouper()"></Multiselect>
            <!-- <div class="separator my-12"></div>
            <h3 class="card-title">Gráfica Predeterminada</h3>
            <Multiselect v-model="typeGraphics" :close-on-select="true" :options="optionsTypeGraphics" v-on:select="senDataGrouper()"></Multiselect>
            <div class="separator my-4"></div>
            <div class="form-check form-check-custom form-check-solid">
                <input v-model="saveQuery" class="form-check-input" type="checkbox" value="" id="chkSaveQuery">
                <label class="form-check-label" for="chkSaveQuery">Guardar Resultado de consulta?</label>
            </div>
            <input v-if="saveQuery==true" type="text" class="form-control" placeholder="Nombre de la consulta"> -->
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref} from "vue";
import Multiselect from '@vueform/multiselect';
import { languages } from "prismjs";
import { useAuthStore, type User } from "@/stores/auth";
import ApiService from "@/core/services/ApiService";

const optionsMetrics = [
    {label : 'Usuarios', value : 0, selected : true},
    {label : 'Sesiones', value : 1},
    {label : 'IPs', value : 2}
];

const optionsTypeGraphics = [
    {label : 'Área', value : 0},
    {label : 'Líneas', value : 1},
    {label : 'Barras', value : 2},
    // {label : 'Pastel', value : 3},
    // {label : 'Dona', value : 4},
    // {label : 'Contadores', value : 5},
    // {label : 'Tablas', value : 6}
    // {label : 'Pasos', value: 7}
];

const optionsColumns = ref()
const optionsGroups = ref()
const user = ref()
ApiService.setHeader();

export default defineComponent({
    props: ['sendData'],
    data() {
        return {
            title : 'Agrupar por',
            optionsColumns,
            optionsGroups,
            groupBy: [3],
            showColumns: [],
            optionsMetrics,
            metrics: [],
            optionsTypeGraphics,
            typeGraphics : 0,
            typeAgregation : 0,
            saveQuery : false,
            user
        }
    },
    name: "Grouper",
    components: {
        Multiselect
    },
    methods: {
        async senDataGrouper() {
            const data = {
                groupBy: this.groupBy,
                showColumns: this.showColumns,
                typeGraphics: this.typeGraphics
            }
            this.sendData(data)
        },
        setValues(data) {
            console.log("adding values")
            console.log(data)
            this.groupBy = data.groupBy
            this.showColumns = data.showColumns
        }
    },
    mounted() {
        const store = useAuthStore();
		user.value = store.user
		const payload = {
			"idAccount": user.value.idAccount,
			"showDb": true
		}
		ApiService.post('/api/querybuilder/get-grouper', payload)
		.then(({ data }) => {
			optionsColumns.value = data.columns
            optionsGroups.value = data.groups
		})
		.catch(({ response }) => {
			console.log(response)
		});
    }
});
</script>
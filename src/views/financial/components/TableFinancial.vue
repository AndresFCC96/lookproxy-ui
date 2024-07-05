<template>
    <div class="container">
        <div class="card">
            <div class="card-body">
                <DataTable
					class="display table table-bordered dr-responsive"
					:columns="columns"
					:data="dataFinancial"
					:options="{}"
					ref="table"
				/>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { config } from "@/core/helpers/config";
import { themeName } from "@/core/helpers/documentation";
// import DataTableDefaultConfig from '@/core/config/DataTableDefaultConfig';
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net';
import DataTableLib from 'datatables.net-bs5';

DataTable.use(DataTableLib);
const dataFinancial = ref([])
const table = ref();
const columns = ref()
let dt;

// const options = DataTableDefaultConfig

export default {
    props: ["dataApi"],
	data () {
		return {
			columns: columns,
			dataFinancial: dataFinancial,
			dt: dt,
			// options : options
		}
	},
	name: "tableFinancial",
	components: {
		DataTable
	},
	methods : {
	},
	setup() {
		onMounted(() => {
			// dt = table.value.dt;
		//setCurrentPageTitle("Generador de consultas EZProxy");
		});
        columns.value = [
			{
				data: null,
                render: function(data, type, row, meta) {
					let classObject = (data.active) ? 'success' : 'danger'
					let textObject = (data.active) ? 'Activo' : 'Inactivo'
					return (`<span class="badge badge-square badge-${classObject}">${textObject}</span>`)
				},
				title: 'Activa',
			},
            {
                data: 'title',
                title: 'Titulo',
            },
            {
                data: 'users',
                title: 'Usuarios',
            },
			{
				data: null,
                render: function(data, type, row, meta) {
                    return (`$ `+new Intl.NumberFormat("de-DE").format(data.pricePerUser))
				},
				title: '$ Por usuario',
			},
            {
                data: 'sessions',
                title: 'Sesiones',
            },
			{
				data: null,
                render: function(data, type, row, meta) {
                    return (`$ `+new Intl.NumberFormat("de-DE").format(data.pricePerSession))
				},
				title: '$ Por sesión',
			},
            {
                data: 'searchs',
                title: 'Búsquedas',
            },
			{
				data: null,
                render: function(data, type, row, meta) {
					return (`$ `+new Intl.NumberFormat("de-DE").format(data.pricePerSearch))
				},
				title: '$ Por usuario',
			}
		];
		return {
			config,
			themeName
		};
	},
    mounted () {
        dataFinancial.value = this.dataApi
    }
};
</script>
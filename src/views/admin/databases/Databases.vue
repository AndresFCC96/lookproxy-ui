<template>
    <div class="card">
        <div class="card-header">
            <h3 class="card-title">Listado de Usuarios</h3>
        </div>
        <div class="card-body">
            <DataTable
				class="display table table-bordered table-responsive"
				:columns="columns"
				:data="databases"
				:options="{}"
				ref="table"
			/>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { config } from "@/core/helpers/config";
import { themeName } from "@/core/helpers/documentation";
import { useAuthStore, type User } from "@/stores/auth";
// import DataTableDefaultConfig from '@/core/config/DataTableDefaultConfig';
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net';
import DataTableLib from 'datatables.net-bs5';
import ApiService from "@/core/services/ApiService";

DataTable.use(DataTablesCore);
const databases = ref([])
const table = ref();
const columns = ref()
let dt;

// const options = DataTableDefaultConfig

export default {
	data () {
		return {
			columns: columns,
			databases: databases,
			dt: dt,
			// options : options
		}
	},
	name: "viewDatabases",
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
					return (data[0])
				},
				title: 'Id',
			},
            {
				data: null,
                render: function(data, type, row, meta) {
					return (data[1])
				},
				title: 'Orden',
			},
            {
				data: null,
                render: function(data, type, row, meta) {
					return (data[2])
				},
				title: 'Template',
			},
            {
				data: null,
                render: function(data, type, row, meta) {
					return (data[3])
				},
				title: 'Titulo',
			},
            {
				data: null,
                render: function(data, type, row, meta) {
					let classUser = (data[4]) ? 'success' : 'danger'
					let textUser = (data[4]) ? 'Activo' : 'Inactivo'
					return (`<span class="badge badge-square badge-${classUser}">${textUser}</span>`)
				},
				title: 'Activa',
			},
            {
				data: null,
                render: function(data, type, row, meta) {
					return (data[5])
				},
				title: 'Url',
			},
			{
				data: null,
				title: 'Acciones',
				render: function(data, type, row, meta) {
					return (`<button class="btn btn-sm btn-icon btn-warning"><i class="fa-solid fa-pen-to-square"></i></button>`)
				},
			}
		];
		const store = useAuthStore();
		const user = store.user
		const payload = {
            "fields" : ["d.id", "d.order", "t.title", "d.title", "d.active", "d.url"],
            "filters" : [
                {
                    "item" : "d.\"idAccount_id\"",
                    "operator" : "=",
                    "value" : 1
                }
            ]
        }
		ApiService.setHeader();
		ApiService.post("api/databases/filter", payload)
        .then(({ data }) => {
			databases.value = data
        })
        .catch(({ response }) => {
			console.log(response)
        });
		return {
			config,
			themeName
		};
	},
};
</script>

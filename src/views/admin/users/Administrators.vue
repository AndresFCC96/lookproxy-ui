<template>
    <div class="card">
        <div class="card-header">
            <h3 class="card-title">Listado de Usuarios</h3>
        </div>
        <div class="card-body">
			<div class="table-responsive">
				<DataTable
					class="display table table-bordered dr-responsive"
					:columns="columns"
					:data="dataUsuarios"
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
import { useAuthStore, type User } from "@/stores/auth";
// import DataTableDefaultConfig from '@/core/config/DataTableDefaultConfig';
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net';
import DataTableLib from 'datatables.net-bs5';
import ApiService from "@/core/services/ApiService";

DataTable.use(DataTablesCore);
const dataUsuarios = ref([])
const table = ref();
const columns = ref()
let dt;

// const options = DataTableDefaultConfig

export default {
	data () {
		return {
			columns: columns,
			dataUsuarios: dataUsuarios,
			dt: dt,
			// options : options
		}
	},
	name: "usersViewLibrary",
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
				data: 'id',
				title: 'Id Usuario',
			},
            {
                data: 'username',
                title: 'Usuario',
            },
			{
				data: null,
                render: function(data, type, row, meta) {
					return (`${data.first_name} ${data.last_name}`)
				},
				title: 'Nombre',
			},
			{
				data: null,
				render: function(data, type, row, meta) {
					let classUser = (data.is_active) ? 'success' : 'danger'
					let textUser = (data.is_active) ? 'Activo' : 'Inactivo'
					return (`<span class="badge badge-square badge-${classUser}">${textUser}</span>`)
				},
				title: 'Activo'
			},
            {
                data: 'last_login',
                title: 'Ultimo Login'
            },
			{
				data: null,
				title: 'Acciones',
				render: function(data, type, row, meta) {
					return (`<button class="btn btn-sm btn-icon btn-warning"><i class="fa-solid fa-pen-to-square"></i></button>
							<button class="btn btn-sm btn-icon btn-danger"><i class="fa-solid fa-trash-can"></i></button>`)
				},
			}
		];
		const store = useAuthStore();
		const user = store.user
		const payload = {
			"fields" : ["*"],
			"filters" : [
				{
					"item" : "idAccount",
					"operator" : "=",
					"value" : user.idAccount
				}
			]
		}
		ApiService.setHeader();
		ApiService.post("api/users/filter", payload)
        .then(({ data }) => {
			dataUsuarios.value = data
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

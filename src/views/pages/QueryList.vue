<template>
    <div class="card">
        <div class="card-header">
            <h3 class="card-title">Listado de Consultas</h3>
        </div>
        <div class="card-body">
            <!-- <DataTable
				class="display table table-bordered table-responsive"
				:columns="columns"
				:data="querys"
				:options="{}"
				ref="table"
			/> -->
			<div class="pb-2">
				<router-link to="/querybuilder" class="btn btn-sm btn-primary">Nueva Consulta</router-link>
			</div>
			<table class="table table-bordered table-hover">
				<thead>
					<tr>
						<th>Id</th>
						<th>Nombre</th>
						<th>Creador</th>
						<th>Plataforma</th>
						<th>Acciones</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="query in querys">
						<td>{{ query[0] }}</td>
						<td>{{ query[1] }}</td>
						<td>{{ query[7]+' '+query[8] }}</td>
						<td>{{ query[6] }}</td>
						<td>
							<div class="btn-group">
								<button class="btn btn-sm btn-icon btn-warning" @click="editQuery(query[0])"><i class="fa-solid fa-pen-to-square"></i></button>
								<button class="btn btn-sm btn-icon btn-info"><i class="fa-solid fa-calendar-check"></i></button>
								<button class="btn btn-sm btn-icon btn-danger"><i class="fa-solid fa-trash-can"></i></button>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { config } from "@/core/helpers/config";
import { themeName } from "@/core/helpers/documentation";
import { useAuthStore, type User } from "@/stores/auth";
import { useQueryStore, type Query } from "@/stores/queryBuilder"
// import DataTableDefaultConfig from '@/core/config/DataTableDefaultConfig';
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net';
import DataTableLib from 'datatables.net-bs5';
import ApiService from "@/core/services/ApiService";
ApiService.setHeader();

DataTable.use(DataTablesCore);
const querys = ref([])
const table = ref();
const columns = ref()

export default {
	data () {
		return {
			columns: columns,
			querys,
			showDatatable: false
		}
	},
	name: "querylist",
	components: {
		DataTable
	},
	methods : {
        editQuery(idQuery) {
            const store = useQueryStore();
			const payload = {
				"idQuery" : idQuery
			}
			ApiService.get(`api/querybuilder/${idQuery}/`)
			.then(({ data }) => {
				let query = JSON.parse(data.query)
				let dataQuery = {
					id: data.id,
					name: data.name,
					defaultGraphic: data.defaultGraphic,
					dataFilter: query.filters,
					dataGrouper: query.grouper
				}
				store.setQuery(dataQuery)
				this.$router.push({ name: "querybuilder" });
			})
			.catch(({ response }) => {
				console.log(response)
			});
        }
	},
	setup() {
		onMounted(() => {
			// dt = table.value.dt;
		//setCurrentPageTitle("Generador de consultas EZProxy");
		});
		return {
			config,
			themeName
		};
	},
    mounted() {
        // columns.value = [
		// 	{
		// 		data: null,
        //         render: function(data, type, row, meta) {
		// 			return (data[0])
		// 		},
		// 		title: 'Id',
		// 	},
        //     {
		// 		data: null,
        //         render: function(data, type, row, meta) {
		// 			return (data[1])
		// 		},
		// 		title: 'Nombre',
		// 	},
        //     {
		// 		data: null,
        //         render: function(data, type, row, meta) {
		// 			return (data[7]+' '+data[8])
		// 		},
		// 		title: 'Creador',
		// 	},
        //     {
		// 		data: null,
        //         render: function(data, type, row, meta) {
		// 			return (data[6])
		// 		},
		// 		title: 'Plataforma',
		// 	},
        //     {
		// 		data: null,
        //         render: function(data, type, row, meta) {
		// 			return (`
        //                 <button class="btn btn-sm btn-icon btn-warning" @click="editQuery()"><i class="fa-solid fa-pen-to-square"></i></button>
        //                 <button class="btn btn-sm btn-icon btn-info"><i class="fa-solid fa-calendar-check"></i></button>
        //                 <button class="btn btn-sm btn-icon btn-danger"><i class="fa-solid fa-trash-can"></i></button>
        //             `)
		// 		},
		// 		title: 'Acciones',
		// 	},
		// ];
		const store = useAuthStore();
		const user = store.user
		const payload = {
            "idAccount" : localStorage.idAccount
        }
		ApiService.post("api/querybuilder/get-querys", payload)
        .then(({ data }) => {
			querys.value = data
            // this.showDatatable = true
        })
        .catch(({ response }) => {
			console.log(response)
        });
    }
};
</script>

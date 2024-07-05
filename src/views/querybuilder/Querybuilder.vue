<template>
	<div class="card">
		<div class="card-header">
			<h3 class="card-title">{{ nameConsult }}</h3>
		</div>
		<div class="card-body">
			<div class="row">
				<div class="col-md-6 col-sm-12" v-if="showObjects">
					<Filters ref="filterObject" :sendData="readFilterData" :dataFilters="dataApi"></Filters>
				</div>
				<div class="col-md-6" v-if="showObjects">
					<Grouper ref="grouperObject" :sendData="readGrouperData"></Grouper>
				</div>
			</div>
			<div class="separator my-4"></div>
			<div style="text-align: right">
				<button type="button" class="btn btn-sm btn-primary" v-bind:class="{'disabled': disabledButtonGenerate}" v-on:click="generateQuery()" :data-kt-indicator="indicatorQuery">
					<span class="indicator-label">
						Generar Consulta
					</span>
					<span class="indicator-progress">
						Generando, un momento por favor... <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
					</span>
				</button>
			</div>
		</div>
	</div>
	<div class="separator my-4"></div>
	<div v-if="showSaveQuery">
		<div class="card">
			<div class="card-body">
				<h6>Guardar Informe</h6>
				<div class="input-group">
					<span class="input-group-text">Gráfico Predeterminado</span>
					<Multiselect class="form-select" v-model="defaulGraphic" :close-on-select="true" :options="optionsTypeGraphics"></Multiselect>
					<span class="input-group-text">Nombre del Informe</span>
					<input type="text" class="form-control" placeholder="Nombre de la consulta" v-model="nameQuery">
					<span class="input-group-text">
						<div class="text-end align-middle">
							<button class="btn btn-sm btn-success" v-on:click="saveQuery()">Guardar</button>
						</div>
					</span>
				</div>
			</div>
		</div>
		<div class="separator my-4"></div>
	</div>
	<div class="card" v-if="showResults">
		<div class="card-header bg-success">
			<h3 class="card-title text-white">
				Resultado de la Consulta
			</h3>
			<span class="input-group-text bg-success">
				<div class="row">
					<div class="col-6">
						<button class="btn btn-sm btn-light" v-on:click="attempSaveQuery()">Guardar Consulta</button>
					</div>
					<div class="col-6">
						<button class="btn btn-sm btn-secondary">Exportar</button>
					</div>
				</div>
			</span>
		</div>
		<div class="card-body">
			<DataGraphics :dataResult="dataResult"></DataGraphics>
		</div>
	</div>
</template>
<script lang="ts">
import Multiselect from '@vueform/multiselect';
import Filters from "@/views/querybuilder/components/Filters.vue";
import Grouper from "@/views/querybuilder/components/Grouper.vue";
import DataGraphics from "@/views/querybuilder/components/DataGraphics.vue";
import { defineComponent, onMounted, ref } from "vue";
import { config } from "@/core/helpers/config";
import { themeName } from "@/core/helpers/documentation";
import { useAuthStore, type User } from "@/stores/auth";
import { useQueryStore, type Query } from "@/stores/queryBuilder"
import ApiService from "@/core/services/ApiService";
import Swal from "sweetalert2/dist/sweetalert2.js";
//import { setCurrentPageTitle } from "@/core/helpers/breadcrumb";

const dataApi = ref()
const user = ref()
const dataResult = ref()
const storeQuery = useQueryStore()
ApiService.setHeader();

const optionsTypeGraphics = [
    {label : 'Área', value : 0},
    {label : 'Líneas', value : 1},
    {label : 'Barras', value : 2}
];

export default {
	data () {
		return {
			dataApi,
			dataFilters: [],
			dataGrouper: [],
			showResults: false,
			indicatorQuery: "off",
			user,
			showObjects: false,
			disabledButtonGenerate: false,
			dataResult,
			optionsTypeGraphics,
			defaulGraphic: 0,
			showSaveQuery: false,
			nameQuery: '',
			nameConsult: 'Nueva Consulta',
			storeQuery,
			idQuery: 0,
			isSaved: false
		}
	},
	name: "querybuilder",
	components: {
		Filters,
		Grouper,
		DataGraphics,
		Multiselect
	},
	methods : {
		readFilterData (data) {
			this.dataFilters = data
		},
		readGrouperData (data) {
			this.dataGrouper = data
		},
		generateQuery () {
			this.indicatorQuery = "on"
			this.disabledButtonGenerate = true
			this.showResults = false
			const payload = {
				idAccount: user.value.idAccount,
				filters: this.dataFilters,
				grouper: this.dataGrouper,
				schema: localStorage.schema,
				table: localStorage.table
			}
			ApiService.post('/api/querybuilder/create-query', payload)
			.then(({ data }) => {
				dataResult.value = data
				this.indicatorQuery = "off"
				this.disabledButtonGenerate = false
				this.showResults = true
			})
			.catch(({ response }) => {
				this.indicatorQuery = "off"
				this.disabledButtonGenerate = false
				console.log(response)
			});
		},
		attempSaveQuery() {
			if (this.isSaved) {
				this.updateQuery()
			} else {
				this.showSaveQuery=true
			}
		},
		saveQuery() {
			let jsonQuery = {
				filters: this.dataFilters,
				grouper: this.dataGrouper,
			}
			const payload = {
				query: JSON.stringify(jsonQuery),
				idUser: user.value.id,
				idAccount: user.value.idAccount,
				name: this.nameQuery,
				is_default: false,
				default_graphic: this.defaulGraphic,
				platform: 'EZProxy'
			}
			ApiService.post('/api/querybuilder/', payload)
			.then(({ data }) => {
				this.showSaveQuery = false
				this.isSaved = true
				this.idQuery = data.id
				this.nameConsult = 'Guardado: '+this.nameQuery
				Swal.fire({
					text: "Se ha guardado la Consulta",
					icon: "success",
					confirmButtonText: "Ok",
				})
			})
			.catch(({ response }) => {
				console.log(response)
			});
		},
		updateQuery() {
			const payload = {
				query: JSON.stringify({
					filters: this.dataFilters,
					grouper: this.dataGrouper,
				}),
				idUser: user.value.id,
				name: this.nameQuery,
				default_graphic: this.defaulGraphic
			}
			ApiService.put(`/api/querybuilder/${this.idQuery}/`, payload)
			.then(({ data }) => {
				this.showSaveQuery = false
				this.nameConsult = 'Guardado: '+this.nameQuery
				Swal.fire({
					text: "Se ha guardado la Consulta",
					icon: "success",
					confirmButtonText: "Ok",
				})
			})
			.catch(({ response }) => {
				console.log(response)
			});
		},
		getQueryStore() {
			const query = storeQuery.query
			if (query.id) {
				this.dataGrouper = query.dataGrouper
				this.dataFilters = query.dataFilter
				this.idQuery = query.id
				this.isSaved = true
				this.nameQuery = query.name
				this.nameConsult = 'Guardado: '+query.name
				this.sendValuesFilter(query.dataFilter)
				this.sendValuesGrouper(query.dataGrouper)
			}
		},
		sendValuesFilter(data) {
			(this.$refs.filterObject as any).setValues(data);
		},
		sendValuesGrouper(data) {
			(this.$refs.grouperObject as any).setValues(data);
		}
	},
	setup() {
		onMounted(() => {
			//setCurrentPageTitle("Generador de consultas EZProxy");
		});
		const store = useAuthStore();
		const user = store.user;
		return {
			config,
			themeName
		};
	},
	mounted() {
		const store = useAuthStore();
		user.value = store.user
		const payload = {
			"idAccount": user.value.idAccount,
			"showDb": true
		}
		ApiService.post('/api/userslibrary/get-filters', payload)
		.then(({ data }) => {
			dataApi.value = data
			this.showObjects = true
			setTimeout(() => {
				this.getQueryStore()
			}, 100);
		})
		.catch(({ response }) => {
			console.log(response)
		});
	},
	unmounted() {
		storeQuery.purgeQuery()
	}
};
</script>

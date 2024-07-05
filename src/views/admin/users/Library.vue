<template>
    <div class="card">
        <div class="card-header">
            <h3 class="card-title">Usuarios de la Biblioteca</h3>
        </div>
        <div class="card-body">
			<div class="row">
				<div class="col-12">
					<div class="row" v-if="showSelFilter">
						<div class="col-5">
							<Multiselect v-model="selFilter" :options="optionsFilter"></Multiselect>
							Filtrar por
						</div>
						<div class="col-5">
							<!-- Aplicacion de Filtros -->
							<div v-for="(item, i) in optionsFilter">
								<div v-if="item.value == selFilter">
									<Multiselect :options="item.values" mode="tags" v-model="valuesFilter"></Multiselect>
								</div>
							</div>
							Seleccionar Filtro
						</div>
						<div class="col-2">
							<button class="btn btn-primary" v-on:click="page=0; loadUsersLibrary()">Filtrar Usuarios</button>
						</div>
					</div>
				</div>
				<div class="separator my-10"></div>
				<div class="col-12">
					<div class="row">
						<div class="col-4">
							Mostrar
							<select v-model="itemsPerPage" v-on:change="loadUsersLibrary()">
								<option v-for="option in optionsPagination" :value="option.value">{{ option.item }}</option>
							</select>
							items
						</div>
						<div class="col-4"></div>
						<div class="col-4">
							<input type="text" class="form-control" placeholder="Buscar" v-model="wordsSearch" v-on:change="loadUsersLibrary()">
						</div>
					</div>
					<div class="separator my-2"></div>
					<table class="table table-bordered table-hover">
						<thead>
							<tr>
								<th>Id Usuario</th>
								<th>Nombre</th>
								<th>Email</th>
								<th>Activo</th>
								<th>Acciones</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td colspan="5" class="text-center" v-if="showLoadingUsers">
									<div class="d-flex justify-content-center">
										<div class="spinner-border" role="status">
										</div>
									</div>
									Cargando...
								</td>
							</tr>
							<tr v-for="user in usersLibrary">
								<td>{{ user[0] }}</td>
								<td>{{ user[2] }}</td>
								<td>{{ user[3] }}</td>
								<td>
									<span class="badge badge-square" v-bind:class="{'badge-success': user[4], 'badge-danger': !user[4]}">
										{{ (user[4]) ? 'Activo': 'Inactivo' }}
									</span>
								</td>
								<td>
									<button class="btn btn-sm btn-icon btn-warning"><i class="fa-solid fa-pen-to-square"></i></button>
									<button class="btn btn-sm btn-icon btn-danger"><i class="fa-solid fa-trash-can"></i></button>
								</td>
							</tr>
						</tbody>
					</table>
					<div class="row">
						<div class="col-4">
							Mostrando {{ (page*itemsPerPage)+1 }} a {{ ((page*itemsPerPage)+itemsPerPage) > totalItems ? totalItems : (page*itemsPerPage)+itemsPerPage }} de {{ totalItems }}
						</div>
						<div class="col-8 text-end">
							<ul class="pagination">
								<li class="page-item previous" v-bind:class="{'disabled': statusPrevious}"><button id="btnPreviousPage" class="page-link" v-on:click="changePage('-')"><i class="previous"></i></button></li>
								<li class="page-item next" v-bind:class="{'disabled': statusNext}"><button id="btnNextPage" class="page-link" v-on:click="changePage('+')"><i class="next"></i></button></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { config } from "@/core/helpers/config";
import { themeName } from "@/core/helpers/documentation";
import { useAuthStore, type User } from "@/stores/auth";
import ApiService from "@/core/services/ApiService";
import Multiselect from '@vueform/multiselect'

const optionsFilter = ref([{
	id: -1,
	label: '',
	bgName: '',
	type: 0,
	value: 0,
	values: []
}])

const usersLibrary = ref()

const optionsPagination = [
	{
		item: "10",
		value: 10
	},
	{
		item: "20",
		value: 20
	},
	{
		item: "30",
		value: 30
	},
	{
		item: "40",
		value: 40
	},
	{
		item: "50",
		value: 50
	}
]

const user = ref()

export default {
	data () {
		return {
			optionsFilter,
			selFilter: 0,
			typeFieldFilter: 0,
			showSelFilter: false,
			valuesFilter: [],
			optionsPagination,
			page: 0,
			itemsPerPage: 10,
			totalItems: 101,
			statusPrevious: true,
			statusNext: false,
			usersLibrary,
			user,
			showLoadingUsers: true,
			wordsSearch: ""
		}
	},
	name: "usersViewLibrary",
	components: {
		Multiselect
	},
	methods : {
		changePage(option) {
			if (option == '-') {
				this.page--
				this.statusNext = false
				if (this.page == 0) {
					this.statusPrevious = true
				}
			} else {
				this.page++
				this.statusPrevious = false
				if ((this.page * this.itemsPerPage) + (this.itemsPerPage) >= this.totalItems) {
					this.statusNext = true
				}
			}
			this.loadUsersLibrary()
		},
		loadUsersLibrary() {
			this.showLoadingUsers = true
			usersLibrary.value = []
			let payload ={
				"idAccount": user.value.idAccount,
				"itemsPerPage": this.itemsPerPage,
				"page": this.page,
				"filters": this.getFilters()
			}
			ApiService.post('/api/userslibrary/filter', payload)
			.then(({ data }) => {
				this.totalItems = data.totalItems
				usersLibrary.value = data.users
				this.showLoadingUsers = false
			})
			.catch(({ response }) => {
				console.log(response)
			});
		},
		setTypeField() {
			this.optionsFilter.forEach(elem => {
				if (elem.id == this.selFilter) {
					this.typeFieldFilter = elem.type
				}
			});
		},
		getFilters () {
			this.setTypeField()
			interface filterObject{
				item: string,
				operator: string,
				value: number | string,
				union: string
			}
			let object :filterObject[]
			object = []
			if (this.selFilter > 0) {
				object.push({
					item: "f.id",
					operator: "=",
					value: this.selFilter,
					union: "AND"
				})
				let item = ''
				switch (this.typeFieldFilter) {
					case 0:
						item = 'v."valueString"'
						break
					case 1:
						item = 'v."valueFloat"'
						break
					case 2:
						item = 'v."valueDateTime"'
						break
					case 3:
						item = 'v."valueSelect"'
						break
				}
				for (let i = 0; i < this.valuesFilter.length; i++) {
					object.push({
						item: item,
						operator: "=",
						value: this.valuesFilter[i],
						union: (this.valuesFilter.length == i+1) ? "AND" : "OR"
					})
				}
			}
			if (this.wordsSearch != '') {
				object.push(
					{
						item: "(u.name",
						operator: "like",
						value: `%${this.wordsSearch}%`,
						union: "OR"
					}
				)
				if (parseInt(this.wordsSearch) > 0) {
					object.push({
						item: "u.id",
						operator: "=",
						value: parseInt(this.wordsSearch),
						union: "OR"
					})
				}
				object.push({
					item: "u.email",
					operator: "like",
					value: `%${this.wordsSearch}%`,
					union: ") OR"
				})
			}
			return object
		}
	},
	setup() {
		onMounted(() => {
			//setCurrentPageTitle("Generador de consultas EZProxy");
		});
		return {
			config,
			themeName
		};
	},
	mounted() {
		const store = useAuthStore()
		user.value = store.user
		const payload = {
			"idAccount": user.value.idAccount,
			"showDb": false
		}
		ApiService.setHeader();
		ApiService.post('/api/userslibrary/get-filters', payload)
		.then(({ data }) => {
			optionsFilter.value = data
			this.showSelFilter = true
        })
        .catch(({ response }) => {
			console.log(response)
        });
		this.loadUsersLibrary()
	}
};
</script>

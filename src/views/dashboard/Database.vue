<template>
    <div class="card" v-if="showNoneResults">
        <div class="card-body text-center">
            <i class="bi bi-database-exclamation fs-3x"></i>
            <h5>Tu busqueda no generó resultados, intenta con otra fecha</h5>
        </div>
    </div>
    <div class="card" v-if="showLoading">
        <div class="card-body text-center">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <h5>Estamos cargando tu informe, un momento por favor...</h5>
        </div>
    </div>
    <DatabaseBySessionUser v-if="showDatabaseBySessionUser" :databaseUse="sessionsUserByDb"></DatabaseBySessionUser>
    <br>
    <div class="row">
        <div class="col-12 col-sm-6">
            <div class="card" v-if="showUsersByDb">
                <div class="card-header">
                    <h3 class="card-title">Usuarios por Base de Datos</h3>
                </div>
                <div class="card-body">
                    <DatauseDonut :dataUse="usersByDb"></DatauseDonut>
                </div>
            </div>
        </div>
        <div class="col-12 col-sm-6">
            <div class="card" v-if="showSessionsByDb">
                <div class="card-header">
                    <h3 class="card-title">Sesiones por Base de Datos</h3>
                </div>
                <div class="card-body">
                    <DatauseDonut :dataUse="sessionsByDb"></DatauseDonut>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue"
import DatabaseBySessionUser from "@/views/dashboard/components/DatabaseBySessionUser.vue"
import DatauseDonut from "@/views/dashboard/components/DatauseDonut.vue"
import ApiService from "@/core/services/ApiService";

interface usDb {
    title : string,
    sessions : number,
    users : number,
    queries : number,
    strokeSettings: any
}
interface sDb {
    category: string,
    value: number
}
const usersByDb = ref({})
const sessionsUserByDb = ref({})
const sessionsByDb = ref({})

export default {
    props : ['selectedDate'],
    data () {
        return {
            usersByDb,
            sessionsByDb,
            showDatabaseBySessionUser: false,
            showUsersByDb: false,
            showSessionsByDb: false,
            showNoneResults: false,
            showLoading: false,
            sessionsUserByDb
        }
    },
    name: 'Database',
    components: {
        DatabaseBySessionUser,
        DatauseDonut
    },
    methods: {
        getData(selectDate) {
            this.showDatabaseBySessionUser = false
            this.showUsersByDb = false
            this.showSessionsByDb = false
            this.showNoneResults = false
            this.showLoading = true
            let payload = {
                "beginDate": selectDate,
                "endDate": selectDate,
                "schema": localStorage.schema,
                "table": localStorage.table
            }
            ApiService.setHeader();
            this.getDataSessions(payload)
        },
        getDataSessions(payload) {
            ApiService.post("api/dashboard/sessions-users-db", payload)
            .then(({ data }) => {
                if (data.length == 0) {
                    this.showNoneResults = true
                    this.showLoading = false
                    return
                }
                let suByDb :usDb[] = []
                let sByDb :sDb[] = []
                let uByDb :sDb[] = []
                data.map( (elem) => {
                    suByDb.push({
                        "title" : elem.database,
                        "sessions" : elem.sessions,
                        "users" : elem.users,
                        "queries" : elem.totalQueries,
                        strokeSettings: {
                            stroke: "#F1416C",
                            strokeWidth: 3
                        }
                    })
                    sByDb.push({
                        category: elem.database,
                        value: elem.sessions
                    })
                    uByDb.push({
                        category: elem.database,
                        value: elem.users
                    })
                })
                usersByDb.value = uByDb
                sessionsByDb.value = sByDb
                sessionsUserByDb.value = suByDb
                this.showDatabaseBySessionUser = true
                this.showUsersByDb = true
                this.showSessionsByDb = true
                this.showLoading = false
            })
            .catch(({ response }) => {
                console.log(response)
            });
        },
    },
    mounted() {
        this.getData(this.selectedDate)
    }
}
</script>
<style scoped>
.hello {
    width: 100%;
    height: 300px;
}
</style>
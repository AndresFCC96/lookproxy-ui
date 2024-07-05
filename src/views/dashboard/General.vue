<template>
    <div class="card" v-if="showNoneResults">
        <div class="card-body text-center">
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
    <div v-if="showGeneralDashboard">
        <UserInfo ref="userInfo"></UserInfo>
        <div class="separator my-5"></div>
        <div class="row">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header bg-primary">
                        <h3 class="card-title">Porcentaje de Usuarios Activos</h3>
                    </div>
                    <div class="card-body">
                        <DataUse v-if="showPercentUsers" :valueData="valuePercentUsers"></DataUse>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header bg-primary">
                        <h3 class="card-title">Porcentaje de Bases de Datos Consultadas</h3>
                    </div>
                    <div class="card-body">
                        <DataUse v-if="showPercentDb" :valueData="valuePercentDb"></DataUse>
                    </div>
                </div>
            </div>
        </div>
        <div class="separator my-4"></div>
        <div v-if="showDataBaseUse">
            <DatabaseUse :selectedDate="selectedDate"></DatabaseUse>
        </div>
        <div class="separator my-4"></div>
        <div class="row">
            <div class="col-6 col-sm-4">
                <div class="card card-py-1 hover-elevate-up shadow-sm parent-hover" style="padding: 0">
                    <div class="card-body d-flex align-items">
                        <span class="svg-icon fs-4x">
                            <i class="bi bi-box-arrow-in-right fs-3x text-success"></i>
                        </span>
                        <span class="ms-3 text-gray-700 parent-hover-primary fs-6">
                            Sesiones
                            <p class="fw-bold fs-3">{{ dataUserInfo.totalSessions.toLocaleString() }}</p>
                        </span>
                    </div>
                </div>
            </div>
            <div class="col-6 col-sm-4">
                <div class="card card-py-1 hover-elevate-up shadow-sm parent-hover" style="padding: 0">
                    <div class="card-body d-flex align-items">
                        <span class="svg-icon fs-4x">
                            <i class="bi-file-earmark-post fs-3x text-warning"></i>
                        </span>
                        <span class="ms-3 text-gray-700 parent-hover-primary fs-6">
                            Páginas Vistas
                            <p class="fw-bold fs-3">{{ dataUserInfo.totalRequest.toLocaleString() }}</p>
                        </span>
                    </div>
                </div>
            </div>
            <div class="col-6 col-sm-4">
                <div class="card card-py-1 hover-elevate-up shadow-sm parent-hover" style="padding: 0">
                    <div class="card-body d-flex align-items">
                        <span class="svg-icon fs-4x">
                            <i class="bi bi-file-earmark-zip fs-3x text-info"></i>
                        </span>

                        <span class="ms-3 text-gray-700 parent-hover-primary fs-6">
                            Total Descargas
                            <p class="fw-bold fs-3">{{ dataUserInfo.totalDownload.toLocaleString() }} Gb</p>
                        </span>
                    </div>
                </div>
            </div>
            <div class="col-6 col-sm-4">
                <div class="card card-py-1 hover-elevate-up shadow-sm parent-hover" style="padding: 0">
                    <div class="card-body d-flex align-items">
                        <span class="svg-icon fs-4x">
                            <i class="bi bi-person-fill-check fs-3x text-success"></i>
                        </span>
                        <span class="ms-3 text-gray-700 parent-hover-primary fs-6">
                            Sessiones promedio por Usuario
                            <p class="fw-bold fs-3">{{ (dataUserInfo.usersConnected > 0) ? dataUserInfo.avgSessionsPerUser.toLocaleString() : 0 }}</p>
                        </span>
                    </div>
                </div>
            </div>
            <div class="col-6 col-sm-4">
                <div class="card card-py-1 hover-elevate-up shadow-sm parent-hover" style="padding: 0">
                    <div class="card-body d-flex align-items">
                        <span class="svg-icon fs-4x">
                            <i class="bi bi-person-workspace fs-3x text-warning"></i>
                        </span>
                        <span class="ms-3 text-gray-700 parent-hover-primary fs-6">
                            Páginas promedio por Usuario
                            <p class="fw-bold fs-3">{{ (dataUserInfo.usersConnected > 0) ? dataUserInfo.avgRequestPerUser.toLocaleString() : 0 }}</p>
                        </span>
                    </div>
                </div>
            </div>
            <div class="col-6 col-sm-4">
                <div class="card card-py-1 hover-elevate-up shadow-sm parent-hover" style="padding: 0">
                    <div class="card-body d-flex align-items">
                        <span class="svg-icon fs-4x">
                            <i class="bi bi-person-video2 fs-3x text-info"></i>
                        </span>
                        <span class="ms-3 text-gray-700 parent-hover-primary fs-6">
                            Descargas promedio por Usuario
                            <p class="fw-bold fs-3">{{ (dataUserInfo.usersConnected > 0) ? dataUserInfo.avgDownloadPerUser.toLocaleString() : 0 }} Gb</p>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div class="separator my-5"></div>
        <div class="row">
            <div class="col-12 col-sm-6">
                <div class="card">
                    <div class="card-header bg-primary">
                        <h3 class="card-title text-white">
                            <span>
                                <i class="bi bi-people fs-3x text-white"></i>
                            </span>
                            Top 5 usuarios mas activos
                        </h3>
                    </div>
                    <div class="card-body">
                        <table class="table table-sm table-bordered">
                            <thead>
                                <tr class="fw-bold fs-6 text-gray-800">
                                    <th>#</th>
                                    <th>Usuario</th>
                                    <th>Nombre</th>
                                    <th>Sesiones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(user, index) in topUsers">
                                    <td>{{ index+1 }}</td>
                                    <td>{{ user.user_info_username }}</td>
                                    <td>{{ user.user_info_name }}</td>
                                    <td>{{ user.totalSessions }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="col-12 col-sm-6">
                <div class="card">
                    <div class="card-header bg-primary">
                        <h3 class="card-title text-white">
                            <i class="bi bi-database-check fs-3x text-white"></i>
                            Top 5 bases de datos consultadas
                        </h3>
                    </div>
                    <div class="card-body">
                        <table class="table table-row-dashed table-sm">
                            <thead>
                                <tr class="fw-bold fs-6 text-gray-800">
                                    <th>#</th>
                                    <th>Base de datos</th>
                                    <th>Sesiones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(database, index) in topDatabases">
                                    <td>{{ index+1 }}</td>
                                    <td>{{ database.database }}</td>
                                    <td>{{ database.totalSessions }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue"
import { config } from "@/core/helpers/config"
import { themeName } from "@/core/helpers/documentation"
import { useAuthStore, type User } from "@/stores/auth";
import UserInfo from "@/views/dashboard/components/UserInfo.vue"
import DataUse from "@/views/dashboard/components/DataUse.vue"
import DataUseEchart from "@/views/dashboard/components/DataUseEchart.vue"
import DatabaseUse from "@/views/dashboard/components/DatabaseUse.vue"
import ApiService from "@/core/services/ApiService";

interface TopUser {
    user_info_username: string,
    user_info_name: string,
    totalSessions: number
}
interface TopDatabase {
    database: string,
    totalSessions: number
}

const user = ref()
const processData = ref({})
const dataUsers = ref({})
const topUsers = ref([] as TopUser[])
const topDatabases = ref([] as TopDatabase[])
const dataUserInfo = ref({
    activeUsers: 0,
    inactiveUsers: 0,
    usersConnected: 0,
    activeDb: 0,
    inactiveDb: 0,
    dbConsulted: 0,
    totalDownload: 0,
    totalSessions: 0,
    totalRequest: 0,
    avgSessionsPerUser: 0,
    avgRequestPerUser: 0,
    avgDownloadPerUser: 0
})
const valuePercentUsers = ref()
const valuePercentDb = ref()

export default {
    props : ['selectedDate'],
    data () {
        return {
            typeGraphic : 0,
            processData,
            dataUsers,
            dataUserInfo,
            showPercentUsers : false,
            valuePercentUsers,
            showPercentDb: false,
            valuePercentDb,
            topUsers,
            topDatabases,
            showDataBaseUse: false,
            showGeneralDashboard: true,
            showNoneResults: false,
            showLoading: false
        }
    },
    name: "General",
    components: {
        UserInfo,
        DataUse,
        DatabaseUse,
        DataUseEchart
    },
    methods : {
        sendInfoUser : function(dataUserInfo) {
            (this.$refs.userInfo as any).updateDataUser(dataUserInfo)
        },
        sendInfoDb : function(dataUserDb) {
            (this.$refs.userInfo as any).updateDataDb(dataUserDb)
        },
        getData(selectDate) {
            this.showLoading = true
            let payload = {
                "beginDate": selectDate,
                "endDate": selectDate,
                "schema": localStorage.schema,
                "table": localStorage.table,
                "idAccount": user.value.idAccount
            }
            console.log(payload)
            this.showPercentUsers = false
            this.showPercentDb = false
            this.showDataBaseUse = false
            ApiService.setHeader();
            this.getTotalUsers(payload)
            this.getTotalDatabases(payload)
            this.getTopUse(payload)
            setTimeout(() => {
                this.showDataBaseUse = true
            }, 100);
        },
        getTotalUsers(payload) {
            ApiService.post("api/dashboard/total-users", payload)
            .then(({ data }) => {
                dataUserInfo.value.activeUsers = data.totalActive
                dataUserInfo.value.inactiveUsers = data.totalInactive
                dataUserInfo.value.usersConnected = data.totalUsers
                let totalDownload = data.totalDownload/1000/1024/1024
                let avgSessions = data.totalSessions / data.totalUsers
                let avgRequest = data.totalRequest / data.totalUsers
                let avgDownload = totalDownload / data.totalUsers
                dataUserInfo.value.totalDownload = totalDownload
                dataUserInfo.value.totalSessions = data.totalSessions
                dataUserInfo.value.totalRequest = data.totalRequest
                dataUserInfo.value.avgSessionsPerUser = avgSessions
                dataUserInfo.value.avgRequestPerUser = avgRequest
                dataUserInfo.value.avgDownloadPerUser = avgDownload
                this.sendInfoUser(dataUserInfo.value)
                valuePercentUsers.value = (data.totalUsers / data.totalActive)*100
                this.showPercentUsers = true
                this.showGeneralDashboard = true
                this.showLoading = false
            })
            .catch(({ response }) => {
                console.log(response)
            })
        },
        getTotalDatabases(payload) {
            ApiService.post("api/dashboard/total-database", payload)
            .then(({ data }) => {
                dataUserInfo.value.activeDb = data.databasesActive,
                dataUserInfo.value.inactiveDb = data.databasesInactive,
                dataUserInfo.value.dbConsulted = data.totalDb
                this.sendInfoDb(dataUserInfo.value)
                valuePercentDb.value = (data.totalDb > 0)
                    ? ((data.totalDb / data.databasesActive) > 1)
                        ? 100 : (data.totalDb / data.databasesActive)*100
                    : 0
                this.showPercentDb = true
            })
            .catch(({ response }) => {
                console.log(response)
            });
        },
        getTopUse(payload) {
            ApiService.post("api/dashboard/top-use", payload)
            .then(({ data }) => {
                topUsers.value = data.topUsers
                topDatabases.value = data.topDatabases
            })
            .catch(({ response }) => {
                console.log(response)
            });
        }
    },
    setup() {
        onMounted(() => {
        });
    },
    mounted() {
        const store = useAuthStore()
        user.value = store.user
        this.getData(this.selectedDate)
        return {
            config,
            themeName
        };
    }
}
</script>
<style scoped>
    .small-p {
        padding: 0;
    }
</style>
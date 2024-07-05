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
    <div class="row">
        <div class="col-12" v-if="showSessionsByCity">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Sesiones por Ciudad</h3>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-12 col-sm-6">
                            <DatauseDonut :dataUse="sessionsByCity"></DatauseDonut>
                        </div>
                        <div class="col-12 col-sm-6">
                            <MapByContinent :typeMap="1" :dataUse="mapSessionsByCity"></MapByContinent>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12" v-if="showSessionsByCountry">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Sesiones por Pais</h3>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-12 col-sm-6">
                            <MapByContinent :typeMap="0" :dataUse="mapSessionsByCountry"></MapByContinent>
                        </div>
                        <div class="col-12 col-sm-6">
                            <DatauseDonut :dataUse="sessionsByCountry"></DatauseDonut>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="js">
import { defineComponent, onMounted, ref } from "vue"
import DatauseDonut from "@/views/dashboard/components/DatauseDonut.vue"
import MapByContinent from "@/views/dashboard/components/MapByContinent.vue"
import ApiService from "@/core/services/ApiService";

const mapSessionsByCity = ref([])
const sessionsByCity = ref([])
const mapSessionsByCountry = ref([])
const sessionsByCountry = ref([])

export default {
    props : ['selectedDate'],
    data () {
        return {
            showSessionsByCity: false,
            showSessionsByCountry: false,
            showNoneResults: false,
            showLoading: false,
            mapSessionsByCity,
            sessionsByCity,
            mapSessionsByCountry,
            sessionsByCountry
        }
    },
    name: 'Geolocalization',
    components: {
        DatauseDonut,
        MapByContinent
    },
    methods: {
        getData(selectDate) {
            this.showLoading = true
            this.showSessionsByCity = false
            this.showSessionsByCountry = false
            let payload = {
                "beginDate": selectDate,
                "endDate": selectDate,
                "schema": localStorage.schema,
                "table": localStorage.table
            }
            ApiService.setHeader();
            ApiService.post("api/dashboard/geolocalization-use", payload)
            .then(({ data }) => {
                console.log("api geo")
                console.log(data)
                if (data.totalSessionsByCity.length == 0) {
                    this.showNoneResults = true
                    this.showLoading = false
                    return
                }
                let sCity = []
                let mCity = []
                data.totalSessionsByCity.map( (item) => {
                    sCity.push({
                        "category": item.city,
                        "value": item.totalSessions
                    })
                    mCity.push({
                        "id" : "CO-"+item.cityCode,
                        "name": item.city,
                        "value": item.totalSessions
                    })
                })
                let sCountry = []
                let mCountry = []
                data.totalSessionsByCountry.map( (item) => {
                    sCountry.push({
                        "category": item.country,
                        "value": item.totalSessions
                    })
                    mCountry.push({
                        "id": item.countryCode,
                        "name": item.country,
                        "value": item.totalSessions
                    })
                })
                sessionsByCity.value = sCity
                mapSessionsByCity.value = mCity
                sessionsByCountry.value = sCountry
                mapSessionsByCountry.value = mCountry
                this.showNoneResults = false
                this.showLoading = false
                this.showSessionsByCity = true
                this.showSessionsByCountry = true
            })
            .catch(({ response }) => {
                console.log(response)
            });
        }
    },
    async mounted() {
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
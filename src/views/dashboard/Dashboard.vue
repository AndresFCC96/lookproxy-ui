<template>
    <div class="row">
        <div class="col-6 col-sm-4">
            <div class="card card-py-1 hover-elevate-up shadow-sm parent-hover" style="padding: 0">
                <div class="card-body d-flex align-items">
                    <span class="svg-icon fs-4x">
                        <i class="bi bi-people-fill fs-3x text-success"></i>
                    </span>
                    <span class="ms-3 text-gray-700 parent-hover-primary fs-6">
                        Usuarios Concurrentes
                        <p class="fw-bold fs-3">5</p>
                    </span>
                </div>
            </div>
        </div>
        <div class="col-6 col-sm-4">
            <div class="card card-py-1 hover-elevate-up shadow-sm parent-hover" style="padding: 0">
                <div class="card-body d-flex align-items">
                    <span class="svg-icon fs-4x">
                        <i class="bi bi-bar-chart-fill fs-3x text-warning"></i>
                    </span>
                    <span class="ms-3 text-gray-700 parent-hover-primary fs-6">
                        Sesiones Concurrentes
                        <p class="fw-bold fs-3">5</p>
                    </span>
                </div>
            </div>
        </div>
        <div class="col-6 col-sm-4">
            <div class="card card-py-1 hover-elevate-up shadow-sm parent-hover" style="padding: 0">
                <div class="card-body d-flex align-items">
                    <span class="svg-icon fs-4x">
                        <i class="bi bi-arrow-repeat fs-3x text-danger"></i>
                    </span>

                    <span class="ms-3 text-gray-700 parent-hover-primary fs-6">
                        Sesiones Replicadas
                        <p class="fw-bold fs-3">0</p>
                    </span>
                </div>
            </div>
        </div>
    </div>
    <div class="separator my-5">
    </div>
    <div class="row">
        <div class="col-12 col-sm-2">
            <select v-model="selectDate" class="form-select" v-on:change="updateDataDashboard()">
                <option v-for="option in dateOptions" :value="option.value">{{ option.label }}</option>
            </select>
            <!-- <Multiselect v-on:change="updateDataDashboard()" v-model="selectDate" :options="dateOptions"></Multiselect> -->
        </div>
        <div class="col-12 col-sm-10">
            <div class="row">
                <div class="col-12 col-sm-3">
                    <button @click="showDashboard=1" class="card hover-elevate-up shadow-sm parent-hover w-100">
                        <div class="card-body d-flex align-items p-3">
                            <span class="svg-icon fs-1">
                                <i class="bi bi-bar-chart fs-2x"></i>
                            </span>
                            <span class="ms-3 text-gray-700 parent-hover-primary fs-6 fw-bold">
                                Resumen General
                            </span>
                        </div>
                    </button>
                </div>
                <div class="col-12 col-sm-3">
                    <button @click="showDashboard=2" class="card hover-elevate-up shadow-sm parent-hover w-100">
                        <div class="card-body d-flex align-items p-3">
                            <span class="svg-icon fs-1">
                                <i class="bi bi-database-gear fs-2x"></i>
                            </span>
                            <span class="ms-3 text-gray-700 parent-hover-primary fs-6 fw-bold">
                                Bases de Datos
                            </span>
                        </div>
                    </button>
                </div>
                <div class="col-12 col-sm-3">
                    <button @click="showDashboard=3" class="card hover-elevate-up shadow-sm parent-hover w-100">
                        <div class="card-body d-flex align-items p-3">
                            <span class="svg-icon fs-1">
                                <i class="bi bi-globe-americas fs-2x"></i>
                            </span>
                            <span class="ms-3 text-gray-700 parent-hover-primary fs-6 fw-bold">
                                Geolocalización
                            </span>
                        </div>
                    </button>
                </div>
                <div class="col-12 col-sm-3">
                    <button @click="showDashboard=4" class="card hover-elevate-up shadow-sm parent-hover w-100">
                        <div class="card-body d-flex align-items p-3">
                            <span class="svg-icon fs-1">
                                <i class="bi bi-person-hearts fs-2x"></i>
                            </span>
                            <span class="ms-3 text-gray-700 parent-hover-primary fs-6 fw-bold">
                                Campos de Usuario
                            </span>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="separator my-5"></div>
    <div v-if="showNoneAccount">
        <div class="card">
            <div class="card-body text-center">
                <h5>Debe Escoger una universidad para mostrar datos</h5>
            </div>
        </div>
    </div>
    <div v-if="showDashboard == 1">
        <General ref="generalDashboard" :selectedDate="selectDate"></General>
    </div>
    <div v-if="showDashboard == 2">
        <Database ref="databaseDashboard" :selectedDate="selectDate"></Database>
    </div>
    <div v-if="showDashboard == 3">
        <Geolocalization ref="geolocalizationDashboard" :selectedDate="selectDate"></Geolocalization>
    </div>
    <div v-if="showDashboard == 4">
        <Fields ref="fieldsDashboard" :selectedDate="selectDate"></Fields>
    </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue"
import { config } from "@/core/helpers/config"
import { themeName } from "@/core/helpers/documentation"
import General from "@/views/dashboard/General.vue"
import Database from "@/views/dashboard/Database.vue"
import Geolocalization from "@/views/dashboard/Geolocalization.vue"
import Fields from "@/views/dashboard/Fields.vue"
import Multiselect from '@vueform/multiselect';
import { useAuthStore, type User } from "@/stores/auth";

// P: Llamar esto desde el api
// Los values son generalizados por el get_begin_date y get_end_date del backend
const dateOptions = [
    {
        label: 'Hoy',
        value: 13
    },{
        label: 'Esta Semana',
        value: 12
    },{
        label: 'Mes Anterior',
        value: 8
    },{
        label: 'Este Mes',
        value: 9
    }, {
        label: 'Trimestre Anterior',
        value: 5
    },{
        label: 'Este Trimestre',
        value: 6
    },{
        label: 'Semestre Anterior',
        value: 3
    },{
        label: 'Este Semestre',
        value: 4
    },{
        label: 'Este año',
        value: 2
    }, {
        label: 'Año pasado',
        value: 1
    }
]

export default defineComponent({
    data () {
        return {
            showDashboard : 0,
            dateOptions,
            selectDate: 13,
            showNoneAccount: false
        }
    },
    name: "dashboard",
    components: {
        General,
        Database,
        Geolocalization,
        Fields,
        Multiselect
    },
    methods : {
        updateDataDashboard() {
            switch (this.showDashboard) {
                case 1:
                    (this.$refs.generalDashboard as any).getData(this.selectDate)
                    break;
                case 2:
                    (this.$refs.databaseDashboard as any).getData(this.selectDate)
                    break;
                case 3:
                    (this.$refs.geolocalizationDashboard as any).getData(this.selectDate)
                    break;
                case 4:
                    (this.$refs.fieldsDashboard as any).getData(this.selectDate)
                    break;
            }
        }
    },
    setup() {
        onMounted(() => {
        });
        return {
            config,
            themeName
        };
    },
    mounted() {
        const store = useAuthStore();
        const user = store.user
        if (user.idAccount == 0) {
            this.showNoneAccount = true
        } else {
            this.showDashboard = 1
        }
    }
});
</script>
<style scoped>
    .small-p {
        padding: 0;
    }
</style>
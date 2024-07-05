<template>
    <div class="card card-flush shadow-sm">
        <div class="card-header bg-dark">
            <h3 class="card-title text-white">Resumen Auditoría</h3>
            <div class="card-toolbar">
                <select class="form-select form-select-solid" aria-label="Select example">
                    <option value="1">Hoy</option>
                    <option value="2">Esta Semana</option>
                    <option value="3">Este Mes</option>
                    <option value="4">Este Trimestre</option>
                    <option value="5">Este Semestre</option>
                    <option value="6">Este Año</option>
                </select>
            </div>
        </div>
        <div class="card-body py-5">
            <div class="row">
                <div class="col-12 col-sm-6">
                    <div class="row">
                        <div class="col-12 col-sm-6 text-center">
                            <AttempSession></AttempSession>
                            Duración Promedio de las Sesiones
                            <p class="fw-bold fs-1">2.14</p>
                            Promedio en Horas
                            <p class="fw-bold fs-1">128.31</p>
                            Promedio en Minutos
                        </div>
                        <div class="col-12 col-sm-6 text-center">
                            <ClosedSession></ClosedSession>
                            Duración Promedio de las Sesiones con Logout
                            <p class="fw-bold fs-1">0</p>
                            Promedio en Horas
                            <p class="fw-bold fs-1">0</p>
                            Promedio en Minutos
                        </div>
                    </div>
                </div>
                <div class="col-12 col-sm-6">
                    <div class="card">
                        <div class="card-header bg-danger">
                            <h3 class="card-title text-white">Top Intentos de Login Fallidos</h3>
                        </div>
                        <div class="card-body">
                            <TableUsers></TableUsers>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">

import { defineComponent, onMounted, ref, provide } from "vue";
import AttempSession from "@/views/Auditory/components/parts/AttempSession.vue";
import ClosedSession from "@/views/Auditory/components/parts/ClosedSession.vue";
import TableUsers from "@/views/Auditory/components/parts/TableUsers.vue";

export default defineComponent({
    mounted() {
        //
    },
    components: {
        AttempSession,
        ClosedSession,
        TableUsers
    },
    data () {
        return {
            valueSession : 0
        }
    },
    name: "auditory",
    methods : {}
});
</script>
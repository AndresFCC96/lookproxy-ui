<template>
    <div class="row">
        <div class="col-12 col-sm-4">
            <div class="card hover-elevate-up shadow-sm parent-hover">
                <div class="card-body d-flex align-items">
                    <span class="svg-icon fs-3x">
                        <i class="bi bi-people-fill fs-3x text-success"></i>
                    </span>

                    <span class="ms-3 text-gray-700 parent-hover-primary fs-6">
                        Usuarios Concurrentes
                        <p class="fw-bold fs-3">5</p>
                    </span>
                </div>
            </div>
        </div>
        <div class="col-12 col-sm-4">
            <div class="card hover-elevate-up shadow-sm parent-hover">
                <div class="card-body d-flex align-items">
                    <span class="svg-icon fs-3x">
                        <i class="bi bi-bar-chart-fill fs-3x text-warning"></i>
                    </span>

                    <span class="ms-3 text-gray-700 parent-hover-primary fs-6">
                        Sesiones Concurrentes
                        <p class="fw-bold fs-3">5</p>
                    </span>
                </div>
            </div>
        </div>
        <div class="col-12 col-sm-4">
            <div class="card hover-elevate-up shadow-sm parent-hover">
                <div class="card-body d-flex align-items">
                    <span class="svg-icon fs-3x">
                        <i class="bi bi-layers-fill fs-3x text-danger"></i>
                    </span>

                    <span class="ms-3 text-gray-700 parent-hover-primary fs-6">
                        Sesiones Replicadas
                        <p class="fw-bold fs-3">9</p>
                    </span>
                </div>
            </div>
        </div>
    </div> 
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
export default {
    props : ['valueData'],
    data () {
        return {
            valueSession : 0
        }
    },
    name: "auditory",
    methods : {}
};
</script>
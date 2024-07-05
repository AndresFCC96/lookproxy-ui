<template>
    <div class="row">
        <div class="col-sm-12 col-md-4">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Estado de los Usuarios</h3>
                </div>
                <div class="card-body">
                    <StateUsers></StateUsers>
                </div>
            </div>
        </div>
        <div class="col-sm-12 col-md-8">
            <div class="card card-primary">
                <div class="card-header">
                    <h3 class="card-title">Usuarios anónimos este Año</h3>
                </div>
                <div class="card-body">
                    <AnonymousUsers></AnonymousUsers>
                </div>
            </div>
        </div>
        <div class="col-12">
            <DetailUsers></DetailUsers>
        </div>
    </div>
</template>
<script lang="ts">

import { defineComponent, onMounted, ref } from "vue";
import StateUsers from "@/views/usersReport/parts/StateUsers.vue";
import AnonymousUsers from "@/views/usersReport/parts/AnonymousUsers.vue";
import DetailUsers from "@/views/usersReport/parts/DetailUsers.vue";

export default defineComponent({
    data () {
        return {
            
        }
        },
        name: "usersreport",
        components: {
            StateUsers,
            AnonymousUsers,
            DetailUsers
        },
        methods : {},
        setup() {
        onMounted(() => {
            //setCurrentPageTitle("Generador de consultas EZProxy");
        });
    },
});
</script>

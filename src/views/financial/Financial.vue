<template>
    <div v-if="showReportFinancial" class="card" id="loading-financial">
        <div class="card-body text-center">
            <button type="button" class="btn btn-primary" data-kt-indicator="on">
                <span class="indicator-progress">
                    Un momento por favor, estamos cargando tu informe... <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
                </span>
            </button>
        </div>
    </div>
    <div class="row" v-if="!showReportFinancial">
        <div class="col-12">
            <TableFinancial :dataApi="dataApi"></TableFinancial>
        </div>
        <div class="separator my-10"></div>
        <div class="col-12">
            <GraphicFinancial :dataApi="dataApi"></GraphicFinancial>
        </div>
    </div>
</template>
<script lang="ts">

import { defineComponent, onMounted, ref } from "vue";
import GraphicFinancial from "@/views/financial/components/GraphicFinancial.vue";
import TableFinancial from "@/views/financial/components/TableFinancial.vue";
import { useAuthStore, type User } from "@/stores/auth";
import ApiService from "@/core/services/ApiService";
const dataApi = ref()
const showReportFinancial = ref(true)

export default defineComponent({
    data () {
        return {
            showReportFinancial,
            dataApi
        }
    },
    name: "financial",
    components: {
        GraphicFinancial,
        TableFinancial
    },
    methods : {},
    setup() {
        onMounted(() => {
        });
        const store = useAuthStore();
        const user = store.user
        const payload = {
            "beginDate": "2023-01-01",
            "endDate": "2023-12-31",
            "schema": localStorage.schema,
            "table": localStorage.table
        }
        ApiService.setHeader();
        ApiService.post("api/databases/financial", payload)
        .then(({ data }) => {
            dataApi.value = data
            showReportFinancial.value = false
        })
        .catch(({ response }) => {
            console.log(response)
        });
}
});
</script>

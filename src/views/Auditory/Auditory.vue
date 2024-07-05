<template>
    <h1>Panel de Visualización de Seguridad</h1>
    <InfoSession></InfoSession>
    <div class="separator my-10"></div>
    <ResumeAuditory></ResumeAuditory>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import InfoSession from "@/views/Auditory/components/InfoSession.vue";
import ResumeAuditory from "@/views/Auditory/components/ResumeAuditory.vue";
export default defineComponent({
    data () {
        return {
        valuePrueba : [{item : 'value'}, {otroItem: 'Otro value'}]
        }
    },
    name: "auditory",
    components: {
        InfoSession,
        ResumeAuditory
    },
    methods : {}
});
</script>
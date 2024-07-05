<template>
    <div class="row">
        <div class="col-12">
            <WordSearch></WordSearch>
        </div>
        <div class="col-12">
            <WordGroup></WordGroup>
        </div>
    </div>
</template>
<script lang="ts">

import { defineComponent, onMounted, ref } from "vue";
import WordSearch from "@/views/wordCloud/components/WordSearch.vue";
import WordGroup from "@/views/wordCloud/components/WordGroup.vue";

export default defineComponent({
    data () {
        return {
            
        }
        },
        name: "wordCloud",
        components: {
            WordSearch,
            WordGroup
        },
        methods : {},
        setup() {
        onMounted(() => {
        });
    },
});
</script>

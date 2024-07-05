import { ref } from "vue";
import { defineStore } from "pinia";

export interface Query {
    id: number;
    dataFilter: any;
    dataGrouper: any;
    name: string;
    defaultGraphic: number;
}

export const useQueryStore = defineStore("query", () => {
    const errors = ref({});
    const query = ref<Query>({} as Query);

    function setQuery(newQuery: Query) {
        query.value = newQuery;
    }

    function purgeQuery() {
        query.value = {} as Query;
    }

    return {
        errors,
        query,
        setQuery,
        purgeQuery
    };
});

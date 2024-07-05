<template>
    <div class="table-responsive">
        <table
        class="
            table table-row-bordered table-row-gray-100
            align-middle
            gs-0
            gy-3
        "
        >
            <thead>
                <tr class="fw-bolder text-muted">
                    <th class="min-w-150px">Usuario</th>
                    <th class="min-w-140px">Intentos de Login Fallados</th>
                </tr>
            </thead>
            <tbody>
                <template v-for="(item, index) in list" :key="index">
                <tr>
                    <td>{{ item.email }}</td>
                    <td>{{ item.attempLogin }}</td>
                </tr>
                </template>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
name: "table-attemps-failed-login",
components: {
    //
},
props: {
    widgetClasses: String,
},
setup() {
    const list = [
    {
        "email" : "user1@lookproxy.com",
        "attempLogin" : 3
    },
    {
        "email" : "user2@lookproxy.com",
        "attempLogin" : 7
    }
    ];

    return {
    list,
    };
},
});
</script>

<template>
    <div class="card card-py-0">
        <div class="card-body">
            <div class="row stats-row ">
                <div class="col-md-12">
                    <div>
                        <div class="tile_count">
                            <div class="col-md-2 col-sm-4  tile_stats_count" style="display: inline-block">
                                <span class="count_top"><i class="fa fa-users"></i> Usuarios Activos</span>
                                <div class=" count counter-up">{{ dataUsers.activeUsers }}</div>
                            </div>
                            <div class="col-md-2 col-sm-4  tile_stats_count" style="display: inline-block">
                                <span class="count_top"><i class="fa fa-user"></i> Usuarios Conectados</span>
                                <div class=" count counter-up">{{ dataUsers.usersConnected }}</div>
                            </div>
                            <div class="col-md-2 col-sm-4  tile_stats_count" style="display: inline-block">
                                <span class="count_top"><i class="fa fa-user-times"></i> Usuarios Inactivos</span>
                                <div class="count counter-up">{{ dataUsers.inactiveUsers }}</div>
                            </div>
                            <div class="col-md-2 col-sm-4  tile_stats_count" style="display: inline-block">
                                <span class="count_top"><i class="fa fa-book"></i> Bases de datos Activas</span>
                                <div class="count counter-up">{{ dataUsers.activeDb }}</div>
                            </div>
                            <div class="col-md-2 col-sm-4  tile_stats_count" style="display: inline-block">
                                <span class="count_top"><i class="fa fa-bookmark"></i> Bases de datos Consultadas</span>
                                <div class="count counter-up">{{ dataUsers.dbConsulted }}</div>
                            </div>
                            <div class="col-md-2 col-sm-4  tile_stats_count" style="display: inline-block">
                                <span class="count_top"><i class="fa fa-bookmark-o"></i> Bases de datos Inactivas</span>
                                <div class=" count counter-up">{{ dataUsers.inactiveDb }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
const dataUsers = ref({
    activeUsers: 0,
    inactiveUsers: 0,
    usersConnected: 0,
    activeDb: 0,
    inactiveDb: 0,
    dbConsulted: 0
})
export default {
    // props : ['dataUsers'],
    data () {
        return {
            dataUsers
        }
    },
    name: "UsersInfo",
    components: {
    },
    methods : {
        updateDataUser : function(data) {
            dataUsers.value.activeUsers = data.activeUsers
            dataUsers.value.inactiveUsers = data.inactiveUsers
            dataUsers.value.usersConnected = data.usersConnected
        },
        updateDataDb : function(data) {
            dataUsers.value.activeDb = data.activeDb
            dataUsers.value.inactiveDb = data.inactiveDb
            dataUsers.value.dbConsulted = data.dbConsulted
        }
    },
    mounted(){
    },
    setup() {
        onMounted(() => {
        });
        return {
        };
    },
};
</script>
<style scoped>
.tile_count {
    margin-bottom: 20px;
    margin-top: 20px;
}

.tile_count .tile_stats_count {
    margin-bottom: 10px;
    border-bottom: 0;
    padding-bottom: 10px;
}

.tile_count .tile_stats_count {
    /* border-bottom: 1px solid #D9DEE4;*/
    padding: 0 10px 0 20px;
    padding-bottom: 0px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    position: relative;
}

.tile_count .tile_stats_count .count {
    font-size: 2.5em;
    line-height: 1.3em;
    font-weight: 600;
}

.tile_count .tile_stats_count::before {
    content: "";
    position: absolute;
    left: 0;
    height: 65px;
    border-left: 2px solid #ADB2B5;
    margin-top: 10px;
}

.tile_count .tile_stats_count:first-child::before {
    border-left: 0;
}

.count_top {
    white-space: pre-line;
}
</style>
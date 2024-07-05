<template>
    <div class="card">
        <div class="card-body">
            <div class="row">
                <div class="col-12 col-sm-3">
                    Base de Datos
                    <select class="form-select" v-model="selBD">
                        <option v-for="item in optionsBD" :value="item.value" v-bind:key="item.value">{{ item.label }}</option>
                    </select>
                </div>
                <div class="col-12 col-sm-4">
                    Fecha Desde
                    <div class="input-group">
                        <select class="form-select" aria-label="Select example" v-model="typeDateBegin">
                            <option v-for="item in optionsDate" :value="item.value" v-bind:key="item.value">{{ item.label }}</option>
                        </select>
                        <span class="input-group-text" id="basic-addon3" v-if="typeDateBegin == 0">Inicio de:</span>
                        <select class="form-select" aria-label="Select example" id="selOptions" v-model="beginDate" v-if="typeDateBegin == 0">
                            <option v-for="item in optionsRelativeDate" :value="item.id" v-bind:key="item.id">{{ item.label }}</option>
                        </select>
                        <VueDatePicker class="form-control form-control-sm" v-model="beginDateText" :auto-apply=true :format="formatDate" placeholder="Seleccione la fecha" v-if="typeDateBegin == 1"></VueDatePicker>
                    </div>
                </div>
                <div class="col-12 col-sm-4">
                    Fecha hasta
                    <div class="input-group">
                        <select class="form-select" aria-label="Select example" v-model="typeDateEnd">
                            <option v-for="item in optionsDate" :value="item.value" v-bind:key="item.value">{{ item.label }}</option>
                        </select>
                        <span class="input-group-text" id="basic-addon3" v-if="typeDateEnd == 0">Final de:</span>
                        <select class="form-select" aria-label="Select example" id="selOptions" v-model="endDate" v-if="typeDateEnd == 0">
                            <option v-for="item in optionsRelativeDate" :value="item.id" v-bind:key="item.id">{{ item.label }}</option>
                        </select>
                        <VueDatePicker class="form-control form-control-sm" v-model="endDateText" :auto-apply=true :format="formatDate" placeholder="Seleccione la fecha" v-if="typeDateEnd == 1"></VueDatePicker>
                    </div>
                </div>
                <div class="col-12 col-sm-1">
                    <br />
                    <button class="btn btn-sm btn-primary">Generar</button>
                </div>
            </div>
        </div>
    </div>
    <br />
    <div class="row">
        <div class="col-6 col-sm-4">
            <div class="card card-py-1 hover-elevate-up shadow-sm parent-hover">
                <div class="card-body d-flex align-items">
                    <span class="svg-icon fs-4x">
                        <i class="bi bi-people-fill fs-3x text-success"></i>
                    </span>
                    <span class="ms-3 text-gray-700 parent-hover-primary fs-6">
                        Usuarios
                        <p class="fw-bold fs-3">{{ totalData.users }}</p>
                    </span>
                </div>
            </div>
        </div>
        <div class="col-6 col-sm-4">
            <div class="card card-py-1 hover-elevate-up shadow-sm parent-hover">
                <div class="card-body d-flex align-items">
                    <span class="svg-icon fs-4x">
                        <i class="bi bi-book fs-3x text-warning"></i>
                    </span>
                    <span class="ms-3 text-gray-700 parent-hover-primary fs-6">
                        Items Consultados
                        <p class="fw-bold fs-3">{{ totalData.itemConsult }}</p>
                    </span>
                </div>
            </div>
        </div>
        <div class="col-6 col-sm-4">
            <div class="card card-py-1 hover-elevate-up shadow-sm parent-hover">
                <div class="card-body d-flex align-items">
                    <span class="svg-icon fs-4x">
                        <i class="bi bi-file-earmark-check-fill fs-3x text-danger"></i>
                    </span>

                    <span class="ms-3 text-gray-700 parent-hover-primary fs-6">
                        Items Leidos
                        <p class="fw-bold fs-3">{{ totalData.itemRead }}</p>
                    </span>
                </div>
            </div>
        </div>
        <div class="col-6 col-sm-4">
            <div class="card card-py-1 hover-elevate-up shadow-sm parent-hover">
                <div class="card-body d-flex align-items">
                    <span class="svg-icon fs-4x">
                        <i class="bi bi-box-arrow-in-right fs-3x text-primary"></i>
                    </span>
                    <span class="ms-3 text-gray-700 parent-hover-primary fs-6">
                        Sesiones
                        <p class="fw-bold fs-3">{{ totalData.sessions }}</p>
                    </span>
                </div>
            </div>
        </div>
        <div class="col-6 col-sm-4">
            <div class="card card-py-1 hover-elevate-up shadow-sm parent-hover">
                <div class="card-body d-flex align-items">
                    <span class="svg-icon fs-4x">
                        <i class="bi bi-journal-arrow-up fs-3x text-dark"></i>
                    </span>
                    <span class="ms-3 text-gray-700 parent-hover-primary fs-6">
                        Número de Consultas
                        <p class="fw-bold fs-3">{{ totalData.consults }}</p>
                    </span>
                </div>
            </div>
        </div>
        <div class="col-6 col-sm-4">
            <div class="card card-py-1 hover-elevate-up shadow-sm parent-hover">
                <div class="card-body d-flex align-items">
                    <span class="svg-icon fs-4x">
                        <i class="bi bi-bookmarks-fill fs-3x text-info"></i>
                    </span>
                    <span class="ms-3 text-gray-700 parent-hover-primary fs-6">
                        Número de Lecturas
                        <p class="fw-bold fs-3">{{ totalData.reads }}</p>
                    </span>
                </div>
            </div>
        </div>
    </div>
    <br />
    <div class="card">
        <div class="card-header bg-primary">
            <div class="row card-title">
                <div class="col-11">
                    <div class="input-group">
                        <select id="selOptionSegment" class="form-select form-select-sm" v-model="selSegment">
                            <optgroup label="Segmento">
                                <option v-for="item in optionsSegment" :value="item.value" v-bind:key="item.value">{{ item.label }}</option>
                            </optgroup>
                        </select>
                        <select class="form-select form-select-sm" v-model="selIndicator" data-bs-toggle="tooltip" title="Seleccione el Indicador">
                            <optgroup label="Indicador">
                                <option v-for="item in optionsIndicator" :value="item.value" v-bind:key="item.value">{{ item.label }}</option>
                            </optgroup>
                        </select>
                        <input id="g1_n" name="g1n" type="number" value="10" min="5" max="50" class="form-control graph-var-1 limit" data-bs-toggle="tooltip" title="Seleccione la cantidad de registros que desea ver">
                    </div>
                </div>
                <div class="col-1">
                    <button class="btn btn-sm btn-secondary">Generar</button>
                </div>
            </div>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-12 col-sm-6">
                    <table class="table table-sm table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>Titulo</th>
                                <th>Numero de Lecturas</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in tableBooks">
                                <td>{{ item.name }}</td>
                                <td>{{ item.value }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col-12 col-sm-6">
                    <GraphicBook></GraphicBook>
                </div>
            </div>
        </div>
    </div>

    <div class="card">
        <div class="card-header bg-primary">
            <div class="row card-title">
                <div class="col-11">
                    <div class="input-group">
                        <select id="selOptionSegment" class="form-select form-select-sm" v-model="selSegmentDetail">
                            <optgroup label="Segmento">
                                <option v-for="item in optionsSegment" :value="item.value" v-bind:key="item.value">{{ item.label }}</option>
                            </optgroup>
                        </select>
                        <select class="form-select form-select-sm" v-model="selIndicator1" data-bs-toggle="tooltip" title="Seleccione el Indicador">
                            <optgroup label="Indicador 1">
                                <option v-for="item in optionsIndicator" :value="item.value" v-bind:key="item.value">{{ item.label }}</option>
                            </optgroup>
                        </select>
                        <select class="form-select form-select-sm" v-model="selIndicator2" data-bs-toggle="tooltip" title="Seleccione el Indicador">
                            <optgroup label="Indicador 2">
                                <option v-for="item in optionsIndicator" :value="item.value" v-bind:key="item.value">{{ item.label }}</option>
                            </optgroup>
                        </select>
                        <input id="g1_n" name="g1n" type="number" value="10" min="5" max="50" class="form-control graph-var-1 limit" data-bs-toggle="tooltip" title="Seleccione la cantidad de registros que desea ver">
                    </div>
                </div>
                <div class="col-1">
                    <button class="btn btn-sm btn-secondary">Generar</button>
                </div>
            </div>
        </div>
        <div class="card-body">
            <DetailGraphic></DetailGraphic>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { config } from "@/core/helpers/config";
import { themeName } from "@/core/helpers/documentation";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { 
    optionsBD,
    optionsDate,
    optionsRelativeDate,
    totalData,
    optionsSegment,
    optionsIndicator,
    tableBooks
} from "@/views/pages/_mock_/DataResources.js";
import GraphicBook from "@/views/detailResources/parts/Graphic.vue";
import DetailGraphic from "@/views/detailResources/parts/DetailGraphic.vue";

const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
}

export default defineComponent({
    data () {
        return {
            optionsBD : optionsBD,
            optionsDate : optionsDate,
            optionsRelativeDate : optionsRelativeDate,
            selBD : 1,
            typeDateBegin : 0,
            typeDateEnd : 0,
            beginDateText : null,
            endDateText : null,
            beginDate : 8,
            endDate : 8,
            relativeDateBegin : 0,
            totalData : totalData,
            optionsSegment : optionsSegment,
            optionsIndicator : optionsIndicator,
            selSegment : 0,
            selIndicator : 1,
            tableBooks : tableBooks,
            selSegmentDetail : 1,
            selIndicator1 : 4,
            selIndicator2 : 5
        }
    },
    name: "detailResources",
    components: {
        VueDatePicker,
        GraphicBook,
        DetailGraphic
    },
    methods : {
        formatDate : formatDate,
    },
    setup() {
        onMounted(() => {
        });
        return {
            config,
            themeName
        };
    },
});
</script>
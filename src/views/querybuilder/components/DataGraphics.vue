<template>
<ul class="nav nav-tabs nav-line-tabs mb-5 fs-6">
    <li class="nav-item">
        <a class="nav-link active" data-bs-toggle="tab" href="#kt_tab_pane_1">Tabla Detallada</a>
    </li>
    <li class="nav-item" v-if="showGraphicLine">
        <a class="nav-link" data-bs-toggle="tab" href="#kt_tab_pane_2">Grafica de Lineas</a>
    </li>
    <li class="nav-item" v-if="showGraphicArea">
        <a class="nav-link" data-bs-toggle="tab" href="#kt_tab_pane_3">Grafica de Área</a>
    </li>
    <li class="nav-item" v-if="showGraphicBar">
        <a class="nav-link" data-bs-toggle="tab" href="#kt_tab_pane_4">Grafica de Barras</a>
    </li>
</ul>

<div class="tab-content" id="myTabContent">
    <div class="tab-pane fade show active" id="kt_tab_pane_1" role="tabpanel">
        <p v-if="resultNone">Tu consulta no generó ningún dato. Prueba aplicando otros filtros o fechas</p>
        <div class="table-responsive" v-if="showTable">
            <DataTable
                class="display table table-bordered dr-responsive"
                :columns="columns"
                :data="values"
                :options="{
                }"
            />
        </div>
    </div>
    <div class="tab-pane fade" id="kt_tab_pane_2" role="tabpanel">
        <p v-if="resultNone">Tu consulta no generó ningún dato. Prueba aplicando otros filtros o fechas</p>
        <div v-if="showGraphicLine">
            <Lines :dataGraphic="dataConvertLines"></Lines>
        </div>
    </div>
    <div class="tab-pane fade" id="kt_tab_pane_3" role="tabpanel">
        <p v-if="resultNone">Tu consulta no generó ningún dato. Prueba aplicando otros filtros o fechas</p>
        <div v-if="showGraphicArea">
            <Area :dataGraphic="dataConvertArea"></Area>
        </div>
    </div>
    <div class="tab-pane fade" id="kt_tab_pane_4" role="tabpanel">
        <p v-if="resultNone">Tu consulta no generó ningún dato. Prueba aplicando otros filtros o fechas</p>
        <div v-if="showGraphicBar">
            <Bar :dataGraphic="dataConvertArea"></Bar>
        </div>
    </div>
</div>
</template>
<script lang="js">
import { defineComponent, onMounted, ref } from "vue";
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net';
import DataTableLib from 'datatables.net-bs5';
import Lines from '@/views/querybuilder/components/parts/Lines.vue'
import Area from '@/views/querybuilder/components/parts/Area.vue'
import Bar from '@/views/querybuilder/components/parts/Bar.vue'
//import { setCurrentPageTitle } from "@/core/helpers/breadcrumb";
DataTable.use(DataTableLib);
const columns = ref()
const values = ref()
const dataConvertLines = ref()
const dataConvertArea = ref()

export default defineComponent({
    props: ['dataResult'],
	data () {
		return {
            resultNone: false,
            showTable: false,
            showGraphicLine: false,
            showGraphicArea: false,
            showGraphicBar: false,
            columns,
            values,
            dataConvertLines,
            dataConvertArea
		}
	},
	name: "datagraphics",
	components: {
        DataTable,
        Lines,
        Area,
        Bar
	},
	methods : {
        convertDataToGraphicLines(data) {
            let dataLegend = []
            let dataGrouper = []
            let fieldSeries = []
            let dataSeries = []
            data.columns.forEach(elem => {
                if (!elem.grouper) {
                    dataLegend.push(elem.title)
                    fieldSeries.push(elem.data)
                    dataSeries.push({
                        name: elem.title,
                        dataName: elem.data,
                        type: 'line',
                        stack: 'Total',
                        data: []
                    })
                } else {
                    dataGrouper.push(elem.data)
                }
            });
            let dataXaxis = []
            data.values.forEach(elem => {
                let title = ''
                dataGrouper.forEach(element => {
                    title += elem[element]+' - '
                })
                title = title.substring(0, title.length - 3)
                dataXaxis.push(title)
                for (let i = 0; i < dataSeries.length; i++) {
                    dataSeries[i].data.push(elem[dataSeries[i].dataName])
                }
            });
            dataConvertLines.value = {
                dataSeries: dataSeries,
                dataXaxis: dataXaxis,
                dataLegend: dataLegend
            }
            this.showGraphicLine = true
        },
        convertDataGraphicArea(data) {
            let dataValues = []
            let dataSeries = []
            let dataGrouper = []
            data.columns.forEach(elem => {
                if (!elem.grouper) {
                    dataSeries.push({
                        data: elem.data,
                        title: elem.title
                    })
                } else {
                    dataGrouper.push(elem.data)
                }
            });
            data.values.forEach(elem => {
                let title = ''
                let object = {}
                dataGrouper.forEach(element => {
                    title += elem[element]+' - '
                })
                title = title.substring(0, title.length - 3)
                object['grouper'] = title
                for (let i = 0; i < dataSeries.length; i++) {
                    object[dataSeries[i].data] = elem[dataSeries[i].data]
                }
                dataValues.push(object)
            });
            dataConvertArea.value = {
                dataValues: dataValues,
                dataSeries: dataSeries
            }
            this.showGraphicArea = true
        },
        convertDataGraphicBar (data) {
            // No se realiza conversion, recibe el mismo objeto que la grafica de area
            this.showGraphicBar = true
        }
	},
    mounted() {
        const data = this.dataResult
        this.showTable = false
        this.showGraphicLine = false
        if (data.values.length == 0){
            this.resultNone = true
            return
        } else {
            columns.value = this.dataResult.columns
            values.value = this.dataResult.values
            this.showTable = true
            this.convertDataToGraphicLines(data)
            this.convertDataGraphicArea(data)
            this.convertDataGraphicBar(data)
        }
    }
});
</script>

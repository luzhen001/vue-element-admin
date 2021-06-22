<template>
    <div class="app-container">
        <panel-group @handleSetLineChartData="handleSetLineChartData" />
        <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
            <line-chart :chart-data="lineChartData" />
        </el-row>
        <el-row :gutter="32">
            <el-col :xs="24" :sm="24" :lg="8">
                <div class="chart-wrapper">
                    <raddar-chart />
                </div>
            </el-col>
            <el-col :xs="24" :sm="24" :lg="8">
                <div class="chart-wrapper">
                    <pie-chart />
                </div>
            </el-col>
            <el-col :xs="24" :sm="24" :lg="8">
                <div class="chart-wrapper">
                    <bar-chart />
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="32">
            <el-col :xs="{span: 24}" :sm="{span: 24}" :lg="{span: 8}">
                <div class="chart-wrapper">
                    <pie-circle />
                </div>
            </el-col>
            <el-col :xs="{span: 24}" :sm="{span: 24}" :lg="{span: 10}">
                <transaction-table />
            </el-col>
            <el-col :xs="{span: 24}" :sm="{span: 24}" :lg="{span: 6}">
                <box-card />
            </el-col>
        </el-row>
    </div>
</template>
<script>
import PanelGroup from './childcomps/PanelGroup'
import LineChart from './childcomps/LineChart'
import RaddarChart from './childcomps/RaddarChart'
import PieChart from './childcomps/PieChart'
import BarChart from './childcomps/BarChart'
import TransactionTable from './childcomps/TransactionTable'
import BoxCard from './childcomps/BoxCard'
import pieCircle from './childcomps/pieCircleChart'
const lineChartData = {
    newVisitis: {
        expectedData: [300, 220, 161, 134, 105, 160, 265, 200, 298, 180],
        actualData: [230, 182, 101, 154, 362, 140, 145, 261, 401, 105]
    },
    messages: {
        expectedData: [200, 192, 120, 144, 160, 130, 140, 180, 230, 150],
        actualData: [180, 160, 151, 106, 145, 150, 130, 165, 200, 98]
    },
    purchases: {
        expectedData: [80, 100, 121, 104, 105, 90, 100, 60, 200, 150],
        actualData: [120, 90, 100, 138, 142, 130, 130,140, 180, 230]
    },
    shoppings: {
        expectedData: [130, 140, 181, 282, 105, 290, 160, 180, 130, 40],
        actualData: [120, 82, 191, 154, 40, 180, 230, 162, 200, 130]
    }
}
export default {
    name: 'DashboardAdmin',
    components: {
        PanelGroup,
        LineChart,
        RaddarChart,
        PieChart,
        BarChart,
        TransactionTable,
        BoxCard,
        pieCircle
    },
    data() {
        return {
            lineChartData: lineChartData.newVisitis
        }
    },
    methods: {
        handleSetLineChartData(type) {
            this.lineChartData = lineChartData[type];
        }
    }
}
</script>
<style lang="scss" scoped>
    .app-container {
        position: relative;
        background-color: rgb(240, 242, 245);
        .chart-wrapper {
            background: #fff;
            padding: 16px 16px 0;
            margin-bottom: 32px;
        }
    }
    @media (max-width:1024px) {
        .chart-wrapper {
            padding: 8px;
        }
    }
</style>
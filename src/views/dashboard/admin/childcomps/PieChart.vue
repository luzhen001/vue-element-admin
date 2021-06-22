<template>
    <div :class="className" :style="{height:height,width:width}" />
</template>
<script>
import echarts from 'echarts'
import resize from 'utils/echartResize'
require('echarts/theme/macarons') // echarts theme
export default {
    mixins: [resize],
    props: {
        className: {
            type: String,
            default: 'chart'
        },
        width: {
            type: String,
            default: '100%'
        },
        height: {
            type: String,
            default: '300px'
        }
    },
    data() {
        return {
            chart: null
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.initChart();
        });
    },
    beforeDestroy() {
        if (!this.chart) {
            return;
        }
        this.chart.dispose();
        this.chart = null;
    },
    methods: {
        initChart() {
            this.chart = echarts.init(this.$el, 'macarons');
            this.chart.setOption({
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    left: 'center',
                    bottom: '10',
                    data: ['情侣房', '海景房', '大床房', '总统套房', '商务房']
                },
                series: [
                    {
                        name: '房间预订比例',
                        type: 'pie',
                        roseType: 'radius',
                        radius: [15, 95],
                        center: ['50%', '38%'],
                        data: [
                            { value: 320, name: '情侣房' },
                            { value: 240, name: '海景房' },
                            { value: 149, name: '大床房' },
                            { value: 100, name: '总统套房' },
                            { value: 190, name: '商务房' }
                        ],
                        animationEasing: 'cubicInOut',
                        animationDuration: 2600
                    }
                ]
            })
        }
    }
}
</script>
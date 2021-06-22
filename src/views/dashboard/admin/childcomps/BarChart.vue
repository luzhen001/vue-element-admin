<template>
    <div :class="className" :style="{height:height,width:width}" />
</template>
<script>
import echarts from 'echarts'
import resize from 'utils/echartResize'
import {getAroundDate} from 'utils/index'
require('echarts/theme/macarons')
const animationDuration = 6000
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
            let xData = [];
            let tipData = [];
            for(let i=0;i<7;i++){
                xData.push(getAroundDate(0-i,2));
                tipData.push(getAroundDate(0-i,1));
            }
            this.chart = echarts.init(this.$el, 'macarons');
            this.chart.setOption({
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {//坐标轴指示器，坐标轴触发有效
                        type: 'shadow' //默认为直线，可选为：'line' | 'shadow' | 'cross'
                    },
                    // formatter:function (params) {
                    //     return `
                    //             <div>${tipData[params[0].dataIndex]}</div>
                    //             <div>${params[0].seriesName}：<span style="color: #25C1F6">${params[0].value}</span> 间</div>
                    //             <div>${params[1].seriesName}：<span style="color: #25C1F6">${params[1].value}</span> 间</div>
                    //             <div>${params[2].seriesName}：<span style="color: #25C1F6">${params[2].value}</span> 间</div>
                    //         `
                    // }
                },
                grid: {
                    top: 10,
                    left: '2%',
                    right: '2%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    data: xData.reverse(),
                    axisTick: {
                        alignWithLabel: true
                    }
                }],
                yAxis: [{
                    type: 'value',
                    axisTick: {
                        show: false
                    }
                }],
                series: [
                {
                    name: '情侣房',
                    type: 'bar',
                    stack: 'vistors',
                    barWidth: '60%',
                    data: [59, 82, 100, 334, 390, 30, 220],
                    animationDuration
                },
                {
                    name: '江景房',
                    type: 'bar',
                    stack: 'vistors',
                    barWidth: '60%',
                    data: [80, 52, 200, 34, 190, 330, 100],
                    animationDuration
                },
                {
                    name: '网红房',
                    type: 'bar',
                    stack: 'vistors',
                    barWidth: '60%',
                    data: [30, 152, 50, 134, 290, 130, 160],
                    animationDuration
                }]
            })
        }
    }
}
</script>
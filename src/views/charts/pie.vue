<template>
    <div class="chart-container">
        <div :id="chartId" class="chart"></div>
    </div>
</template>
<script>
import echarts from 'echarts'
import resize from 'utils/echartResize'
export default {
    name: 'PieChart',
    mixins: [resize],
    data() {
        return {
            chart: null,
            chartId:'pieChart'
        }
    },
    mounted() {
        this.initChart();
    },
    beforeDestroy() {
        if (!this.chart) {
            return;
        }
        this.chart.dispose();
        this.chart = null;
    },
    methods:{
        initChart(){
            this.chart = echarts.init(document.getElementById(this.chartId));
            this.chart.setOption({
                backgroundColor: 'rgba(0,0,0,.1)',//全图默认背景
                color: ['#e93038','#27cc78','#39b7d6','#1997ae','#ffa500','#ff69b4','#ba55d3','#cd5c5c','#ffa500','#40e0d0'], //默认色板
                title: {
                    text: '用户访问来源',
                    subtext: '数据纯属虚构',
                    left: 'center',
                    y:30,
                    itemGap: 10,// 主副标题纵向间隔，单位px，默认为10，
                    textStyle: {
                        fontSize: 26,
                        fontWeight: 'bold',
                        color: '#333' //主标题文字颜色
                    },
                    subtextStyle: {
                        color: '#aaa'// 副标题文字颜色
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical', // 布局方式，默认为水平布局，可选为： 'horizontal' ¦ 'vertical'
                    x:200,// 水平安放位置，默认为全图居中，可选为： 'center' ¦ 'left' ¦ 'right' {number}（x坐标，单位px）
                    y: 'center', // 垂直安放位置，默认为全图顶端，可选为： 'top' ¦ 'bottom' ¦ 'center' {number}（y坐标，单位px）
                    data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎','朋友介绍','其他来源']
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: [
                            {value: 335, name: '直接访问'},
                            {value: 610, name: '邮件营销'},
                            {value: 236, name: '联盟广告'},
                            {value: 535, name: '视频广告'},
                            {value: 1528, name: '搜索引擎'},
                            {value: 568, name: '朋友介绍'},
                            {value: 688, name: '其他来源'},
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            });
        }
    }
}
</script>
<style lang="scss" scoped>
    .chart-container{
        width: 100%;
        position: relative;
        height: calc(100vh - 84px);
        .chart{
            width: 100%;
            height: 100%;
        }
    }
</style>
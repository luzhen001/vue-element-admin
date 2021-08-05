<template>
    <div class="chart-container">
        <div :id="chartId" class="chart"></div>
    </div>
</template>
<script>
import echarts from 'echarts'
import resize from 'utils/echartResize'
import {getAroundDate} from 'utils/index'
export default {
    name: 'LineChart',
    mixins: [resize],
    data() {
        return {
            chart: null,
            chartId:'chart'
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
    methods: {
        initChart() {
            let xData = [];
            for(let i=0;i<12;i++){
                xData.push(getAroundDate(0-i,2));
            }
            this.chart = echarts.init(document.getElementById(this.chartId));
            this.chart.setOption({
                backgroundColor: '#394056',
                title: {
                    top: 20,
                    left: '1%',
                    text: '房型入住',
                    textStyle: {
                        fontSize: 16,
                        color: '#F1F1F3',
                        fontWeight: 'normal'
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        lineStyle: {
                            color: '#57617B'
                        }
                    }
                },
                legend: {
                    top: 20,
                    icon: 'rect',
                    itemWidth: 14,
                    itemHeight: 5,
                    itemGap: 13,
                    data: ['情侣房', '海景房', '商务房'],
                    right: '1%',
                    textStyle: {
                        fontSize: 12,
                        color: '#F1F1F3'
                    }
                },
                grid: {
                    top: 100,
                    left: '2%',
                    right: '2%',
                    bottom: '2%',
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    axisLine: {
                        lineStyle: {
                        color: '#57617B'
                        }
                    },
                    data:xData.reverse()
                    //data: ['13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30', '13:35', '13:40', '13:45', '13:50', '13:55']
                }],
                yAxis: [{
                    type: 'value',
                    name: '(%)',
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#57617B'
                        }
                    },
                    axisLabel: {
                        margin: 10,
                        textStyle: {
                            fontSize: 14
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#57617B'
                        }
                    }
                }],
                series: [
                    {
                        name: '情侣房',
                        type: 'line',
                        smooth: true,
                        symbol: 'circle',
                        symbolSize: 5,
                        showSymbol: false,
                        lineStyle: {
                            normal: {
                            width: 1
                            }
                        },
                        areaStyle: {
                            normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(137, 189, 27, 0.3)'
                            }, {
                                offset: 0.8,
                                color: 'rgba(137, 189, 27, 0)'
                            }], false),
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                            shadowBlur: 10
                            }
                        },
                        itemStyle: {
                            normal: {
                            color: 'rgb(137,189,27)',
                            borderColor: 'rgba(137,189,2,0.27)',
                            borderWidth: 12

                            }
                        },
                        data: [220, 182, 191, 134, 150, 130, 210, 125, 195, 102, 165, 122]
                    },
                    {
                        name: '海景房',
                        type: 'line',
                        smooth: true,
                        symbol: 'circle',
                        symbolSize: 5,
                        showSymbol: false,
                        lineStyle: {
                            normal: {
                            width: 1
                            }
                        },
                        areaStyle: {
                            normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(0, 136, 212, 0.3)'
                            }, {
                                offset: 0.8,
                                color: 'rgba(0, 136, 212, 0)'
                            }], false),
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                            shadowBlur: 10
                            }
                        },
                        itemStyle: {
                            normal: {
                            color: 'rgb(0,136,212)',
                            borderColor: 'rgba(0,136,212,0.2)',
                            borderWidth: 12

                            }
                        },
                        data: [120, 110, 225, 145, 122, 165, 122, 220, 182, 191, 134, 150]
                    },
                    {
                        name: '商务房',
                        type: 'line',
                        smooth: true,
                        symbol: 'circle',
                        symbolSize: 5,
                        showSymbol: false,
                        lineStyle: {
                            normal: {
                            width: 1
                            }
                        },
                        areaStyle: {
                            normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(219, 50, 51, 0.3)'
                            }, {
                                offset: 0.8,
                                color: 'rgba(219, 50, 51, 0)'
                            }], false),
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                            shadowBlur: 10
                            }
                        },
                        itemStyle: {
                            normal: {
                            color: 'rgb(219,50,51)',
                            borderColor: 'rgba(219,50,51,0.2)',
                            borderWidth: 12
                            }
                        },
                        data: [230, 182, 125, 145, 182, 121, 134, 150, 130, 150, 105, 182]
                    }
                ]
            })
        }
    }
}
</script>
<style lang="scss" scoped>
    .chart-container{
        width: 100%;
        height: calc(100vh - 94px);
        position: relative;
        .chart{
            width: 100%;
            height: 100%;
        }
    }
</style>
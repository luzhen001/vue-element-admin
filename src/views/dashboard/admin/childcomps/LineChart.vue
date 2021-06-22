<template>
    <div :class="className" :style="{height:height,width:width}"></div>
</template>
<script>
import echarts from 'echarts'
import resize from 'utils/echartResize'
import {getAroundDate} from 'utils/index'
require('echarts/theme/macarons')
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
            default: '350px'
        },
        autoResize: {
            type: Boolean,
            default: true
        },
        chartData: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            chart: null
        }
    },
    watch: {
        chartData: {
            deep: true,
            handler(val) {
                this.setOptions(val);
            }
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
            this.setOptions(this.chartData);
        },
        setOptions({ expectedData, actualData } = {}) {
            let xData = [];
            for(let i=0;i<10;i++){
                xData.push(getAroundDate(0-i));
            }
            this.chart.setOption({
                grid: {
                    left: 10,
                    right: 10,
                    bottom: 20,
                    top: 40,
                    containLabel: true
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    },
                    padding: [5, 10]
                },
                //下载图片
                toolbox: {
                    right: 15,
                    itemSize: 15,
                    itemGap: 20,
                    feature: {
                        //dataView: {show:true},//数据预览
                        saveAsImage: {
                            excludeComponents :['toolbox'],
                            pixelRatio: 2
                        }
                    }
                },
                xAxis: {
                    boundaryGap: true,
                    data:xData.reverse(),
                    axisTick: {
                        show: true
                    },
                },
                yAxis: {
                    axisTick: {
                        show: true
                    }
                },
                legend: {
                    data: ['期望值', '实际值']
                },
                series: [
                    {
                        name: '期望值', itemStyle: {
                            normal: {
                                color: '#FF005A',
                                lineStyle: {
                                    color: '#FF005A',
                                    width: 2
                                }
                            }
                        },
                        smooth: true,
                        type: 'line',
                        data: expectedData,
                        animationDuration: 2800,
                        animationEasing: 'cubicInOut'
                    },
                    {
                        name: '实际值',
                        smooth: true,
                        type: 'line',
                        itemStyle: {
                            normal: {
                                color: '#3888fa',
                                lineStyle: {
                                    color: '#3888fa',
                                    width: 2
                                },
                                areaStyle: {
                                    color: '#f3f8ff'
                                }
                            }
                        },
                        data: actualData,
                        animationDuration: 2800,
                        animationEasing: 'quadraticOut'
                    }
                ]
            })
        }
    }
}
</script>
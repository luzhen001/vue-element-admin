<template>
    <div class="block">
        <el-timeline>
            <el-timeline-item v-for="(item,index) of timeline" :key="index" :timestamp="item.timestamp" placement="top">
                <el-card>
                    <h4>{{ item.title }}</h4>
                    <p>{{ item.content }}</p>
                </el-card>
            </el-timeline-item>
        </el-timeline>
    </div>
</template>
<script>
import {getAroundDate,randomString} from '@/utils/index'
export default {
    data() {
        return {
            timeline: []
        }
    },
    created() {
        for(let i=0;i<10;i++){
            this.timeline.push({
                timestamp: getAroundDate(0-i,1),
                title: '标题'+randomString(32),
                content: '这里是时间轴的内容啊这里是时间轴的内容啊这这里是时间轴的内容啊这里是时间轴的内容啊这里是时间轴的内容啊这里是时间轴的内容啊'
            });
        }
    }
}
</script>
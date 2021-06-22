<template>
    <div class="app-container">
        <sticky :z-index="10" class-name="sub-navbar">
            <el-dropdown trigger="click">
                <el-button plain>Platform<i class="el-icon-caret-bottom el-icon--right" /></el-button>
                <el-dropdown-menu slot="dropdown" class="no-border">
                    <el-checkbox-group v-model="platforms" style="padding: 5px 15px;">
                        <el-checkbox v-for="item in platformsOptions" :key="item.key" :label="item.key">
                            {{ item.name }}
                        </el-checkbox>
                    </el-checkbox-group>
                </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown trigger="click">
                <el-button plain>Link<i class="el-icon-caret-bottom el-icon--right" /></el-button>
                <el-dropdown-menu slot="dropdown" class="no-border" style="width:300px;padding:0">
                    <el-input v-model="url" placeholder="请输入URL">
                        <template slot="prepend">URL</template>
                    </el-input>
                </el-dropdown-menu>
            </el-dropdown>
            <div class="time-container">
                <el-date-picker v-model="time" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="选择时间" />
            </div>
            <el-button type="success">确定</el-button>
        </sticky>
        <div class="placeholder-container">
            <div style="background:#e93038">Sticky header, 当页面滚动到预设的位置会吸附在顶部</div>
            <div style="background:#2fcc78"></div>
            <sticky :sticky-top="100" :z-index="10">
                <div style="background:#39b7d6" class="fixeddiv">我被固定住了1</div>
            </sticky>
            <div style="background:#e93038"></div>
            <div style="background:#409EFF"></div>
            <sticky :sticky-top="460" :z-index="10">
                <div style="background:#F56C6C" class="fixeddiv">我被固定住了2</div>
            </sticky>
            <div style="background:#67C23A"></div>
            <div style="background:#E6A23C"></div>
            <div style="background:#909399"></div>
            <div style="background:#303133"></div>
        </div>
    </div>
</template>
<script>
import Sticky from 'components/StickyTop'
export default {
    name: 'StickyDemo',
    components: { Sticky },
    data() {
        return {
            time: '',
            url: '',
            platforms: ['a-platform'],
            platformsOptions: [
                { key: 'a-platform', name: 'platformA' },
                { key: 'b-platform', name: 'platformB' },
                { key: 'c-platform', name: 'platformC' }
            ]
        }
    }
}
</script>
<style scoped lang="scss">
    .time-container {
        display: inline-block;
    }
    .placeholder-container div {
        width: 100%;
        height: 300px;
        color: #fff;
        margin: 30px auto;
    }
    .fixeddiv{
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
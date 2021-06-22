<template>
    <div class="app-container">
        <el-table ref="dragTable" v-loading="listLoading" :data="list" row-key="id" border fit highlight-current-row style="width: 100%">
            <el-table-column align="center" label="序号" width="65">
                <template slot-scope="{row}"><span>{{ row.id }}</span></template>
            </el-table-column>
            <el-table-column min-width="300px" label="标题">
                <template slot-scope="{row}"><span>{{ row.title }}</span></template>
            </el-table-column>
            <el-table-column width="300px" align="center" label="作者">
                <template slot-scope="{row}"><span>{{ row.author }}</span></template>
            </el-table-column>
            <el-table-column width="300px" label="重要性">
                <template slot-scope="{row}"><svg-icon v-for="n in + row.importance" :key="n" icon-class="star" class="icon-star" /></template>
            </el-table-column>
            <el-table-column align="center" label="阅读数" width="300px">
                <template slot-scope="{row}"><span>{{ row.pageviews }}</span></template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="300px">
                <template slot-scope="{}"><svg-icon class="drag-handler" icon-class="drag" /></template>
            </el-table-column>
        </el-table>
        <div style="margin-top:20px;"><el-tag style="margin-right:12px;">默认顺序 :</el-tag> {{ oldList }}</div>
        <div style="margin-top:20px;"><el-tag>拖拽后顺序 :</el-tag> {{ newList }}</div>
    </div>
</template>
<script>
import Sortable from 'sortablejs'
export default {
    name: 'DragTable',
    data() {
        return {
            list: null,
            listLoading: true,
            sortable: null,
            oldList: [],
            newList: []
        }
    },
    created() {
        this.getList();
    },
    methods: {
        async getList() {
            this.listLoading = true;
            let tempArr = [];
            for(let i=0;i<10;i++){
                tempArr.push({
                    id: i+1,
                    author: '作者'+(i+1),
                    title: '我是标题'+(i+1),
                    importance: Math.ceil(Math.random()*10),
                    pageviews: Math.ceil(Math.random()*100),
                })
            }
            this.list = tempArr
            this.listLoading = false
            this.oldList = this.list.map(v => v.id)
            this.newList = this.oldList.slice()
            this.$nextTick(() => {
                this.setSort()
            })
        },
        setSort() {
            const el = this.$refs.dragTable.$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
            this.sortable = Sortable.create(el, {
                ghostClass: 'sortable-ghost',
                setData: function(dataTransfer) {
                    dataTransfer.setData('Text', '')
                },
                onEnd: evt => {
                    const targetRow = this.list.splice(evt.oldIndex, 1)[0]
                    this.list.splice(evt.newIndex, 0, targetRow)
                    const tempIndex = this.newList.splice(evt.oldIndex, 1)[0]
                    this.newList.splice(evt.newIndex, 0, tempIndex)
                }
            })
        }
    }
}
</script>
<style>
    .sortable-ghost{
        opacity: .8;
        color: #fff!important;
        background: #42b983!important;
    }
</style>
<style lang="scss" scoped>
    .icon-star{
        margin-right:2px;
    }
    .drag-handler{
        width: 20px;
        height: 20px;
        cursor: move;
    }
</style>
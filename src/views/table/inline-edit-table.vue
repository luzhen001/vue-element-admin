<template>
    <div class="app-container">
        <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
            <el-table-column align="center" label="序号" width="100">
                <template slot-scope="{row}"><span>{{ row.id }}</span></template>
            </el-table-column>
            <el-table-column align="center" label="日期">
                <template slot-scope="{row}"><span>{{ row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span></template>
            </el-table-column>
            <el-table-column align="center" label="作者">
                <template slot-scope="{row}"><span>{{ row.author }}</span></template>
            </el-table-column>
            <el-table-column label="重要性">
                <template slot-scope="{row}"><svg-icon v-for="n in + row.importance" :key="n" icon-class="star" class="meta-item__icon" /></template>
            </el-table-column>
            <el-table-column label="阅读数">
                <template slot-scope="{row}"><i class="el-icon-view" />{{ row.pageviews }}</template>
            </el-table-column>
            <el-table-column label="标题">
                <template slot-scope="{row}">
                    <template v-if="row.edit">
                        <el-input v-model="row.title" class="edit-input" size="small" />
                        <el-button class="cancel-btn" size="small" icon="el-icon-refresh" type="warning" @click="cancelEdit(row)">取消</el-button>
                    </template>
                    <span v-else>{{ row.title }}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="120">
                <template slot-scope="{row}">
                    <el-button v-if="row.edit" type="success" size="small" icon="el-icon-circle-check" @click="confirmEdit(row)">确定</el-button>
                    <el-button v-else type="primary" size="small" icon="el-icon-edit" @click="row.edit=!row.edit">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    name: 'InlineEditTable',
    filters: {
        statusFilter(status) {
            const statusMap = {
                published: 'success',
                draft: 'info',
                deleted: 'danger'
            }
            return statusMap[status]
        }
    },
    data() {
        return {
            list: null,
            listLoading: true
        }
    },
    created() {
        this.getList()
    },
    methods: {
        async getList() {
            this.listLoading = true;
            let tempArr = [];
            for(let i=0;i<13;i++){
                tempArr.push({
                    id: i+1,
                    timestamp:new Date(),
                    author: '作者'+(i+1),
                    title: '我是标题'+(i+1),
                    importance: Math.ceil(Math.random()*10),
                    pageviews: Math.ceil(Math.random()*100),
                });
            }
            const items = tempArr;
            this.list = items.map(v => {
                this.$set(v, 'edit', false)
                v.originalTitle = v.title
                return v;
            })
            this.listLoading = false;
        },
        cancelEdit(row) {
            row.title = row.originalTitle;
            row.edit = false;
            this.$message({
                type: 'warning',
                message: '已取消编辑！'
            });
        },
        confirmEdit(row) {
            row.edit = false;
            row.originalTitle = row.title;
            this.$message({
                type: 'success',
                message: '标题已编辑成功！'
            });
        }
    }
}
</script>
<style scoped>
    .edit-input {
        padding-right: 100px;
    }
    .cancel-btn {
        position: absolute;
        right: 15px;
        top: 10px;
    }
</style>
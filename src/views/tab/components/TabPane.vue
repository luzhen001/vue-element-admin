<template>
    <el-table :data="list" border fit highlight-current-row style="width: 100%">
        <el-table-column label="序号" v-loading="loading" align="center" width="65" element-loading-text="请给我点时间！">
            <template slot-scope="scope">
                <span>{{ scope.$index+1 }}</span>
            </template>
        </el-table-column>
        <el-table-column label="日期" width="180px" align="center">
            <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span>{{ scope.row.time }}</span>
            </template>
        </el-table-column>
        <el-table-column label="标题">
            <template slot-scope="{row}">
                <span>{{ row.title }}</span>
                <el-tag>{{ row.type }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column label="作者" align="center" width="200px">
            <template slot-scope="scope">
                <span>{{ scope.row.author }}</span>
            </template>
        </el-table-column>
        <el-table-column label="重要性" align="center" width="200px">
            <template slot-scope="scope">
                <svg-icon v-for="n in +scope.row.importance" :key="n" icon-class="star" />
            </template>
        </el-table-column>
        <el-table-column label="阅读数" align="center" width="200px" >
            <template slot-scope="scope">
                <i class="el-icon-view"></i>
                <span>{{ scope.row.readNum }}</span>
            </template>
        </el-table-column>
        <el-table-column label="状态" width="200px" class-name="status-col">
            <template slot-scope="{row}">
                <el-tag :type="row.status | statusFilter">{{ row.status }}</el-tag>
            </template>
        </el-table-column>
    </el-table>
</template>
<script>
import { getExcelList } from 'api'
export default {
    filters: {
        statusFilter (status) {
            const statusMap = {
                success: 'success',
                info: 'info',
                danger: 'danger',
                warning: 'warning'
            }
            return statusMap[status]
        }
    },
    props: {
        type: {
            type: String,
            default: 'CN'
        }
    },
    data () {
        return {
            list: null,
            pageQuery: {
                page: 1,
                limit: 10,
                type: this.type,
                sort: '+id'
            },
            loading: false
        }
    },
    created () {
        this.getList();
    },
    methods: {
        getList () {
            this.loading = true;
            this.$emit('create');
            getExcelList(this.pageQuery).then(res => {
                this.list = res.result;
                this.loading = false;
            });
        }
    }
}
</script>
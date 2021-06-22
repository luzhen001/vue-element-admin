<template>
    <div class="app-container">
        <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
            <el-table-column label="序号" align="center" width="100">
                <template slot-scope="scope">
                    <span>{{ scope.$index + (pageQuery.page-1) * pageQuery.limit + 1 }}</span>
                </template>
            </el-table-column>
            <el-table-column label="日期" align="center" width="260px">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span>{{ scope.row.time }}</span>
                </template>
            </el-table-column>
            <el-table-column label="作者" align="center" width="180px">
                <template slot-scope="scope">
                    <span>{{ scope.row.author }}</span>
                </template>
            </el-table-column>
            <el-table-column label="重要性" width="200px" align="center">
                <template slot-scope="scope">
                    <svg-icon v-for="n in +scope.row.importance" :key="n" icon-class="star" class="meta-item__icon" />
                </template>
            </el-table-column>
            <el-table-column label="状态" class-name="status-col" width="180px">
                <template slot-scope="{row}">
                    <el-tag :type="row.status | statusFilter">{{ row.status }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="标题" min-width="300px">
                <template slot-scope="{row}">
                    <router-link :to="'/example/edit/'+row.id" class="link-type">
                        <span>{{ row.title }}</span>
                    </router-link>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="180px">
                <template slot-scope="scope">
                    <router-link :to="'/example/edit/'+scope.row.id">
                        <i class="el-icon-edit-outline" />
                    </router-link>
                    <i class="el-icon-delete" @click="del(scope.row.id)"></i>
                </template>
            </el-table-column>
        </el-table>
        <pagination v-show="pageTotal>0" :total="pageTotal" :page.sync="pageQuery.page" :limit.sync="pageQuery.limit" @pagination="getList" />
    </div>
</template>
<script>
import { getExcelList } from 'api'
import Pagination from 'components/Pagination'
export default {
    name: 'ArticleList',
    components: { Pagination },
    filters: {
        statusFilter (status) {
            const statusMap = {
                published: 'success',
                draft: 'info',
                deleted: 'danger'
            }
            return statusMap[status];
        }
    },
    data () {
        return {
            list: null,
            listLoading: true,
            pageTotal: 0,
            pageQuery: {
                page: 1,
                limit: 15
            }
        }
    },
    created () {
        this.getList();
    },
    methods: {
        getList () {
            this.listLoading = true;
            getExcelList(this.pageQuery).then(res => {
                this.list = res.result;
                this.pageTotal = res.total;
                this.listLoading = false;
            });
        }
    }
}
</script>
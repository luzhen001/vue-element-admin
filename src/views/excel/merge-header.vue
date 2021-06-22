<template>
    <div class="app-container">
        <div class="title">
            <label class="title-name">文件名称: </label>
            <el-input v-model="filename" placeholder="请输入文件名(默认为当前时间)" style="width:350px;" prefix-icon="el-icon-document" />
            <el-button :loading="downloadLoading" class="btn" type="primary" icon="el-icon-document" @click="handleDownload">导出 Excel</el-button>
        </div>
        <el-table ref="multipleTable" v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
            <el-table-column align="center" label="序号" width="100">
                <template slot-scope="scope">{{ scope.$index + (pageQuery.page -1 ) * pageQuery.limit + 1}}</template>
            </el-table-column>
            <el-table-column label="主要信息" align="center">
                <el-table-column label="标题">
                    <template slot-scope="scope">{{ scope.row.title }}</template>
                </el-table-column>
                <el-table-column label="作者" width="180" align="center">
                    <template slot-scope="scope">{{ scope.row.author }}</template>
                </el-table-column>
                <el-table-column label="重要性" width="220" align="center">
                    <template slot-scope="scope"><svg-icon v-for="n in +scope.row.importance" :key="n" icon-class="star" /></template>
                </el-table-column>
                <el-table-column label="阅读数" width="180" align="center">
                    <template slot-scope="scope"><i class="el-icon-view"></i>{{ scope.row.readNum }}</template>
                </el-table-column>
                <el-table-column label="状态" width="180" align="center">
                    <template slot-scope="scope"><el-tag :type="scope.row.status">{{scope.row.status}}</el-tag></template>
                </el-table-column>
            </el-table-column>
            <el-table-column label="日期" width="220" align="center">
                <template slot-scope="scope"><i class="el-icon-time"></i><span>{{ scope.row.time }}</span></template>
            </el-table-column>
        </el-table>
        <pagination v-show="pageTotal>0" :total="pageTotal" :page.sync="pageQuery.page" :limit.sync="pageQuery.limit" @pagination="getList" />
    </div>
</template>
<script>
import { getExcelList } from 'api'
import { parseTime } from 'utils'
import Pagination from 'components/Pagination'
export default {
    name: 'MergeHeader',
    components:{Pagination},
    data() {
        return {
            list: null,
            filename: '',
            listLoading: true,
            downloadLoading: false,
            pageTotal:0,
            pageQuery:{
                page:1,
                limit:15
            }
        }
    },
    created() {
        this.getList();
    },
    methods: {
        getList() {
            this.listLoading = true;
            getExcelList(this.pageQuery).then(res => {
                this.list = res.result;
                this.pageTotal = res.total;
                this.listLoading = false;
            });
        },
        handleDownload() {
            this.$confirm('确定要导出Excel吗？(不填写文件名，默认为当前时间)','温馨提示',{
                type:'info',
                showClose:false,
                confirmButtonText:'导出',
                cancelButtonText:'想一想',
                dangerouslyUseHTMLString:true
            }).then(()=>{
                this.downloadLoading = true;
                import('utils/exportToExcel').then(excel => {
                const multiHeader = [['Id', 'Main Information', '', '', 'Date']];
                const header = ['', 'Title', 'Author', 'Readings', ''];
                const filterVal = ['id', 'title', 'author', 'pageviews', 'display_time'];
                const list = this.list;
                const data = this.formatJson(filterVal, list);
                const merges = ['A1:A2', 'B1:D1', 'E1:E2'];
                excel.export_json_to_excel({
                    multiHeader,
                    header,
                    merges,
                    data,
                    filename: this.filename
                });
                this.downloadLoading = false;
                });
            }).catch(()=>{});
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => {
                if (j === 'timestamp') {
                    return parseTime(v[j]);
                } else {
                    return v[j];
                }
            }))
        }
    }
}
</script>
<style lang="scss" scoped>
.title{
    margin-bottom: 15px;
    .title-name{
        color: #666;
        font-size: 15px;
    }
    .btn{
        margin-left: 15px;
    }
}
</style>
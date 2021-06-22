<template>
    <div class="app-container">
        <div style="margin-bottom:15px;">
            <FilenameOption v-model="filename" style="margin-right:15px" />
            <!-- <el-input v-model="filename" placeholder="请输入文件名(默认为当前时间)" style="width:350px;" prefix-icon="el-icon-document" /> -->
            <el-button :loading="downloadLoading" type="primary" icon="el-icon-document" @click="handleDownload">导出已选择项</el-button>
            <a href="https://panjiachen.github.io/vue-element-admin-site/feature/component/excel.html" target="_blank" style="margin-left:15px;">
                <el-tag type="info">查看导出Excel文档</el-tag>
            </a>
        </div>
        <el-table ref="multipleTable" v-loading="listLoading" :data="list" element-loading-text="拼命加载中" border fit highlight-current-row @selection-change="handleSelectionChange">
            <el-table-column type="selection" align="center" />
            <el-table-column label="序号" align="center" width="100">
                <template slot-scope="scope">{{ scope.$index + (pageQuery.page-1) * pageQuery.limit + 1 }}</template>
            </el-table-column>
            <el-table-column label="标题">
                <template slot-scope="scope">{{ scope.row.title }}</template>
            </el-table-column>
            <el-table-column label="作者" width="200" align="center">
                <template slot-scope="scope"><el-tag>{{ scope.row.author }}</el-tag></template>
            </el-table-column>
            <el-table-column label="阅读数" width="200" align="center">
                <template slot-scope="scope"><i class="el-icon-view" />{{ scope.row.readNum }}</template>
            </el-table-column>
            <el-table-column  label="日期" width="260" align="center">
                <template slot-scope="scope"><i class="el-icon-time" /><span>{{ scope.row.time }}</span></template>
            </el-table-column>
        </el-table>
        <pagination v-show="pageTotal>0" :total="pageTotal" :page.sync="pageQuery.page" :limit.sync="pageQuery.limit" @pagination="getList" />
    </div>
</template>
<script>
import { getExcelList } from 'api'
import FilenameOption from './components/FilenameOption';
import Pagination from 'components/Pagination'
export default {
    name: 'SelectExcel',
    components:{Pagination,FilenameOption},
    data() {
        return {
            list: null,
            listLoading: true,
            multipleSelection: [],
            downloadLoading: false,
            filename: '',
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
                this.pageTotal = res.total;
                this.list = res.result;
                this.listLoading = false;
            });
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        handleDownload() {
            if (this.multipleSelection.length<=0) {
                this.$message.closeAll();
                this.$message({
                    type: 'warning',
                    showClose: true,
                    message: '请至少勾选一条数据！'
                });
                return false;
            } else {
                this.$confirm('确定要导出Excel吗？(不填写文件名，默认为当前时间)','温馨提示',{
                confirmButtonText:'导出',
                cancelButtonText:'想一想',
                showClose:false,
                type:'info',
                dangerouslyUseHTMLString:true
                }).then(()=>{
                    this.downloadLoading = true;
                    import('utils/exportToExcel').then(excel => {
                        const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date'];
                        const filterVal = ['id', 'title', 'author', 'pageviews', 'display_time'];
                        const list = this.multipleSelection;
                        const data = this.formatJson(filterVal, list);
                        excel.export_json_to_excel({
                            header: tHeader,
                            data,
                            filename: this.filename
                        });
                        this.$refs.multipleTable.clearSelection();
                        this.downloadLoading = false;
                    });
                }).catch(()=>{});
            }
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => v[j]));
        }
    }
}
</script>
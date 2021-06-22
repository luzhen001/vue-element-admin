<template>
    <div class="app-container">
        <div style="margin-bottom:15px;">
            <FilenameOption v-model="filename" style="margin-right:15px" />
            <AutoWidthOption v-model="autoWidth" style="margin-right:15px" />
            <BookTypeOption v-model="bookType" style="margin-right:15px" />
            <el-button :loading="downloadLoading" type="primary" icon="el-icon-document" @click="handleDownload">导出 Excel</el-button>
            <a href="https://panjiachen.github.io/vue-element-admin-site/feature/component/excel.html" target="_blank" style="margin-left:15px;">
                <el-tag type="info">查看导出Excel文档</el-tag>
            </a>
        </div>
        <el-table v-loading="listLoading" :data="list" element-loading-text="Loading..." border fit highlight-current-row>
            <el-table-column label="序号" width="100" align="center">
                <template slot-scope="scope">{{ scope.$index + (pageQuery.page - 1) * pageQuery.limit + 1}}</template>
            </el-table-column>
            <el-table-column label="标题">
                <template slot-scope="scope">{{ scope.row.title }}</template>
            </el-table-column>
            <el-table-column label="作者" align="center">
                <template slot-scope="scope"><el-tag>{{ scope.row.author }}</el-tag></template>
            </el-table-column>
            <el-table-column label="重要性" align="center">
                <template slot-scope="scope"><svg-icon v-for="n in +scope.row.importance" :key="n" icon-class="star" /></template>
            </el-table-column>
            <el-table-column label="状态" align="center">
                <template slot-scope="scope">{{scope.row.type}}</template>
            </el-table-column>
            <el-table-column label="阅读数" align="center">
                <template slot-scope="scope"><i class="el-icon-view" />{{ scope.row.readNum }}</template>
            </el-table-column>
            <el-table-column label="日期" align="center">
                <template slot-scope="scope"><i class="el-icon-time" /><span>{{ scope.row.time }}</span></template>
            </el-table-column>
        </el-table>
        <pagination v-show="pageTotal>0" :total="pageTotal" :page.sync="pageQuery.page" :limit.sync="pageQuery.limit" @pagination="getList" />
    </div>
</template>
<script>
import {getExcelList} from 'api'
import Pagination from 'components/Pagination'
import FilenameOption from './components/FilenameOption'
import AutoWidthOption from './components/AutoWidthOption'
import BookTypeOption from './components/BookTypeOption'
export default {
    name: 'ExportExcel',
    components: {Pagination, FilenameOption, AutoWidthOption, BookTypeOption },
    data() {
        return {
            list: null,
            listLoading: true,
            downloadLoading: false,
            filename: '',
            autoWidth: true,
            bookType: 'xlsx',
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
        getList(){
            this.listLoading = true;
            getExcelList(this.pageQuery).then(res=>{
                if(res.code == 0){
                    this.list = res.result;
                    this.listLoading = false;
                    this.pageTotal = res.total;
                }
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
                    const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date'];
                    const filterVal = ['id', 'title', 'author', 'pageviews', 'display_time'];
                    const list = this.list;
                    const data = this.formatJson(filterVal, list);
                    excel.export_json_to_excel({
                        header: tHeader,
                        data,
                        filename: this.filename,
                        autoWidth: this.autoWidth,
                        bookType: this.bookType
                    });
                    this.downloadLoading = false;
                });
            }).catch(()=>{})
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
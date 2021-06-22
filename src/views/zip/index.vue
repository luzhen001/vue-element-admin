<template>
    <div class="app-container">
        <div class="title">
            <label class="title-name">文件名称:</label>
            <el-input v-model="filename" placeholder="请输入文件名称(默认为当前时间)" style="width:350px;" prefix-icon="el-icon-document" />
            <el-button :loading="downloadLoading" class="btn" v-waves type="primary" icon="el-icon-document" @click="handleDownload">导出 Zip</el-button>
        </div>
        <el-table v-loading="listLoading" :data="list" element-loading-text="拼命加载中" border fit highlight-current-row>
            <el-table-column align="center" label="序号" width="100">
                <template slot-scope="scope">{{scope.$index + (pageQuery.page-1) * pageQuery.limit + 1 }}</template>
            </el-table-column>
            <el-table-column label="图片" width="100" align="center">
                <template slot-scope="scope">
                    <img :src="scope.row.imgurl" alt />
                </template>
            </el-table-column>
            <el-table-column label="标题" width="250" align="center">
                <template slot-scope="scope">{{scope.row.title}}</template>
            </el-table-column>
            <el-table-column label="内容" align="center">
                <template slot-scope="scope">{{scope.row.content}}</template>
            </el-table-column>
            <el-table-column label="作者" width="150" align="center">
                <template slot-scope="scope">
                    <el-tag>{{scope.row.author}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="阅读量" width="150" align="center">
                <template slot-scope="scope">
                    <i class="el-icon-view" />
                    {{scope.row.readNum}}
                </template>
            </el-table-column>
            <el-table-column label="下载量" width="150" align="center">
                <template slot-scope="scope">
                    <i class="el-icon-download" />
                    {{scope.row.downNum}}
                </template>
            </el-table-column>
            <el-table-column label="日期" width="220" align="center">
                <template slot-scope="scope">
                    <i class="el-icon-time" />
                    <span>{{scope.row.time}}</span>
                </template>
            </el-table-column>
        </el-table>
        <pagination v-show="pageTotal>0" :total="pageTotal" :page.sync="pageQuery.page" :limit.sync="pageQuery.limit" @pagination="getList" />
    </div>
</template>
<script>
import Pagination from 'components/Pagination'
import waves from 'directive/waves'
import { getZipList } from 'api'
export default {
    name: 'ExportZip',
    components: { Pagination },
    directives: { waves },
    data () {
        return {
            list: null,
            listLoading: true,
            downloadLoading: false,
            filename: '',
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
        //获取数据
        getList () {
            this.listLoading = true;
            getZipList(this.pageQuery).then(res => {
                this.list = res.result;
                this.pageTotal = res.total;
                this.listLoading = false;
            });
        },
        //导出
        handleDownload () {
            this.$confirm('确定要导出Zip吗？(不填写文件名，默认为当前时间)', '温馨提示', {
                type: 'info',
                showClose: false,
                confirmButtonText: '导出',
                cancelButtonText: '想一想',
                dangerouslyUseHTMLString: true
            }).then(() => {
                this.downloadLoading = true;
                import('utils/exportToZip').then(zip => {
                    const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date'];
                    const filterVal = ['id', 'title', 'author', 'pageviews', 'display_time'];
                    const list = this.list;
                    const data = this.formatJson(filterVal, list);
                    zip.export_txt_to_zip(tHeader, data, this.filename, this.filename);
                    this.downloadLoading = false;
                });
            }).catch(() => { })
        },
        formatJson (filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => v[j]))
        }
    }
}
</script>
<style lang="scss" scoped>
    .title {
        margin-bottom: 15px;
        .title-name {
            color: #666;
            font-size: 15px;
        }
        .btn {
            margin-left: 15px;
        }
    }
</style>
<template>
    <div class="app-container">
        <div class="title-wrap">
            <label class="label-title">标题: </label>
            <el-input v-model="pageQuery.title" placeholder="请输入标题" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
            <label class="label-title ml-15">重要性: </label>
            <el-select v-model="pageQuery.importance" placeholder="选择重要性" clearable style="width: 120px" class="filter-item">
                <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
            </el-select>
            <label class="label-title ml-15">类型: </label>
            <el-select v-model="pageQuery.type" placeholder="选择类型" clearable class="filter-item" style="width: 130px">
                <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key" />
            </el-select>
            <label class="label-title ml-15">排序: </label>
            <el-select v-model="pageQuery.sort" style="width: 150px" class="filter-item" @change="handleFilter">
                <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
            </el-select>
            <el-button class="filter-item ml-15" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
            <el-button class="filter-item ml-15" type="primary" icon="el-icon-edit" @click="handleCreate">添加</el-button>
            <el-button :loading="downloadLoading" class="filter-item ml-15" type="primary" icon="el-icon-download" @click="handleDownload">导出</el-button>
            <el-checkbox v-model="showReviewer" class="filter-item ml-15" @change="tableKey=tableKey+1">审核人</el-checkbox>
        </div>
        <el-table :key="tableKey" v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%;" @sort-change="sortChange">
            <el-table-column label="序号" prop="id" sortable="custom" align="center" width="100" :class-name="getSortClass('id')">
                <template slot-scope="{row}"><span>{{ row.id }}</span></template>
            </el-table-column>
            <el-table-column label="时间" width="180px" align="center">
                <template slot-scope="{row}"><span>{{ row.time }}</span></template>
            </el-table-column>
            <el-table-column label="标题" min-width="150px">
                <template slot-scope="{row}"><span class="link-type" @click="handleUpdate(row)">{{ row.title }}</span><el-tag>{{ row.type | typeFilter }}</el-tag></template>
            </el-table-column>
            <el-table-column label="作者" width="110px" align="center">
                <template slot-scope="{row}"><span>{{ row.author }}</span></template>
            </el-table-column>
            <el-table-column v-if="showReviewer" label="审核人" width="130px" align="center">
                <template slot-scope="{row}"><span style="color:red;">{{ row.reviewer }}</span></template>
            </el-table-column>
            <el-table-column label="重要性" width="180px" align="center">
                <template slot-scope="{row}"><svg-icon v-for="n in +row.importance" :key="n" icon-class="star" class="meta-item__icon" /></template>
            </el-table-column>
            <el-table-column label="阅读数" align="center" width="130">
                <template slot-scope="{row}">
                    <i class="el-icon-view" />
                    <span v-if="row.readNum" class="link-type" @click="handleFetchPv(row.readNum)">{{ row.readNum }}</span>
                    <span v-else>0</span>
                </template>
            </el-table-column>
            <el-table-column label="状态" class-name="status-col" width="130">
                <template slot-scope="{row}"><el-tag :type="row.status | statusFilter">{{ row.status }}</el-tag></template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="320" class-name="small-padding fixed-width">
                <template slot-scope="{row,$index}">
                    <el-button type="primary" size="mini" @click="handleUpdate(row)">编辑</el-button>
                    <el-button v-if="row.status!='published'" size="mini" type="success" @click="handleModifyStatus(row,'published')">发布</el-button>
                    <el-button v-if="row.status!='draft'" size="mini" @click="handleModifyStatus(row,'draft')">草稿</el-button>
                    <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <pagination v-show="pageTotal>0" :total="pageTotal" :page.sync="pageQuery.page" :limit.sync="pageQuery.limit" @pagination="getList" />
        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
            <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
                <el-form-item label="类型" prop="type">
                    <el-select v-model="temp.type" class="filter-item" placeholder="Please select">
                        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
                    </el-select>
                </el-form-item>
                <el-form-item label="时间" prop="timestamp">
                    <el-date-picker v-model="temp.timestamp" type="datetime" placeholder="Please pick a date" />
                </el-form-item>
                <el-form-item label="标题" prop="title">
                    <el-input v-model="temp.title" />
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="temp.status" class="filter-item" placeholder="Please select">
                        <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item" />
                    </el-select>
                </el-form-item>
                <el-form-item label="重要性">
                    <el-rate v-model="temp.importance" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :max="3" style="margin-top:8px;" />
                </el-form-item>
                <el-form-item label="点评">
                    <el-input v-model="temp.remark" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
            <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
                <el-table-column prop="key" label="Channel" />
                <el-table-column prop="pv" label="Pv" />
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogPvVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import {getExcelList} from 'api'
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination'
const calendarTypeOptions = [
    { key: 'CN', display_name: 'China' },
    { key: 'US', display_name: 'USA' },
    { key: 'JP', display_name: 'Japan' },
    { key: 'EU', display_name: 'Eurozone' }
]
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
    acc[cur.key] = cur.display_name
    return acc
}, {})
export default {
    name: 'ComplexTable',
    components: { Pagination },
    filters: {
        statusFilter(status) {
            const statusMap = {
                success: 'success',
                info: 'info',
                danger: 'danger',
                warning:'warning'
            }
            return statusMap[status]
        },
        typeFilter(type) {
            return calendarTypeKeyValue[type]
        }
    },
    data() {
        return {
            tableKey: 0,
            list: null,
            pageTotal: 0,
            listLoading: true,
            pageQuery: {
                page: 1,
                limit: 20,
                importance: undefined,
                title: undefined,
                type: undefined,
                sort: '+id'
            },
            importanceOptions: [1, 2, 3],
            calendarTypeOptions,
            sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
            statusOptions: ['published', 'draft', 'deleted'],
            showReviewer: false,
            temp: {
                id: undefined,
                importance: 1,
                remark: '',
                timestamp: new Date(),
                title: '',
                type: '',
                status: 'published'
            },
            dialogFormVisible: false,
            dialogStatus: '',
            textMap: {
                update: '编辑',
                create: '新增'
            },
            dialogPvVisible: false,
            pvData: [],
            rules: {
                type: [{ required: true, message: 'type is required', trigger: 'change' }],
                timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
                title: [{ required: true, message: 'title is required', trigger: 'blur' }]
            },
            downloadLoading: false
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
        handleFilter() {
            this.pageQuery.page = 1;
            this.getList();
        },
        handleModifyStatus(row, status) {
            this.$message({
                message: '操作成功',
                type: 'success'
            });
            row.status = status;
        },
        sortChange(data) {
            const { prop, order } = data;
            if (prop === 'id') {
                this.sortByID(order);
            }
        },
        sortByID(order) {
            if (order === 'ascending') {
                this.pageQuery.sort = '+id';
            } else {
                this.pageQuery.sort = '-id';
            }
            this.handleFilter();
        },
        resetTemp() {
            this.temp = {
                id: undefined,
                importance: 1,
                remark: '',
                timestamp: new Date(),
                title: '',
                status: 'published',
                type: ''
            }
        },
        handleCreate() {
            this.resetTemp();
            this.dialogStatus = 'create';
            this.dialogFormVisible = true;
            this.$nextTick(() => {
                this.$refs['dataForm'].clearValidate();
            });
        },
        createData() {
            this.$refs['dataForm'].validate((valid) => {
                if (valid) {
                    this.temp.id = parseInt(Math.random() * 100) + 1024
                    this.temp.author = 'vue-element-admin'
                    createArticle(this.temp).then(() => {
                        this.list.unshift(this.temp)
                        this.dialogFormVisible = false
                        this.$notify({
                            title: '成功',
                            message: '创建成功',
                            type: 'success',
                            duration: 2000
                        })
                    })
                }
            })
        },
        handleUpdate(row) {
            this.temp = Object.assign({}, row); // copy obj
            this.temp.timestamp = new Date(this.temp.timestamp);
            this.dialogStatus = 'update';
            this.dialogFormVisible = true;
            this.$nextTick(() => {
                this.$refs['dataForm'].clearValidate()
            })
        },
        updateData() {
            this.$refs['dataForm'].validate((valid) => {
                if (valid) {
                    const tempData = Object.assign({}, this.temp)
                    tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
                    updateArticle(tempData).then(() => {
                        const index = this.list.findIndex(v => v.id === this.temp.id)
                        this.list.splice(index, 1, this.temp)
                        this.dialogFormVisible = false
                        this.$notify({
                            title: '成功',
                            message: '更新成功',
                            type: 'success',
                            duration: 2000
                        })
                    })
                }
            })
        },
        //删除
        handleDelete(row, index) {
            this.$confirm('确定要删除吗？','温馨提示',{
                type:'info',
                showClose:false,
                confirmButtonText:'确定',
                cancelButtonText:'想一想',
                dangerouslyUseHTMLString:true
            }).then(()=>{
                this.$notify({
                    title: '成功',
                    duration: 2000,
                    type: 'success',
                    message: '删除成功'
                });
                this.list.splice(index, 1);
            }).catch(()=>{})
        },
        handleFetchPv(pv) {
            fetchPv(pv).then(response => {
                this.pvData = response.data.pvData;
                this.dialogPvVisible = true;
            });
        },
        //导出
        handleDownload() {
            this.$confirm('确定要导出吗？','温馨提示',{
                type:'info',
                showClose:false,
                confirmButtonText:'导出',
                cancelButtonText:'想一想',
                dangerouslyUseHTMLString:true
            }).then(()=>{
                this.downloadLoading = true
                import('utils/exportToExcel').then(excel => {
                    const tHeader = ['timestamp', 'title', 'type', 'importance', 'status'];
                    const filterVal = ['timestamp', 'title', 'type', 'importance', 'status'];
                    const data = this.formatJson(filterVal);
                    excel.export_json_to_excel({
                        header: tHeader,
                        data,
                        filename: 'table-list'
                    });
                    this.downloadLoading = false;
                });
            }).catch(()=>{})
        },
        formatJson(filterVal) {
            return this.list.map(v => filterVal.map(j => {
                if (j === 'timestamp') {
                    return parseTime(v[j]);
                } else {
                    return v[j];
                }
            }))
        },
        //序号排序
        getSortClass: function(key) {
            const sort = this.pageQuery.sort;
            return sort === `+${key}` ? 'ascending' : 'descending';
        }
    }
}
</script>
<style lang="scss" scoped>
.title-wrap {
    margin-bottom: 15px;
}
.label-title {
    color: #666;
    font-size: 15px;
}
.ml-15{
    margin-left: 15px;
}
</style>
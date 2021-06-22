<template>
    <div class="app-container">
        <div class="filter-container">
            <el-checkbox-group v-model="checkboxVal">
                <el-checkbox label="apple">苹果</el-checkbox>
                <el-checkbox label="banana">香蕉</el-checkbox>
                <el-checkbox label="orange">橘子</el-checkbox>
            </el-checkbox-group>
        </div>
        <el-table :key="key" :data="tableData" border fit highlight-current-row style="width: 100%">
            <el-table-column prop="name" label="水果名称" width="180" />
            <el-table-column v-for="fruit in formThead" :key="fruit" :label="fruit">
                <template slot-scope="scope">{{ scope.row[fruit] }}</template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
const defaultFormThead = ['apple', 'banana']
export default {
    data() {
        return {
            tableData: [
                {
                    name: '水果-1',
                    apple: '苹果-10',
                    banana: '香蕉-10',
                    orange: '橘子-10'
                },
                {
                    name: '水果-2',
                    apple: '苹果-20',
                    banana: '香蕉-20',
                    orange: '橘子-20'
                }
            ],
            key: 1, // table key
            formTheadOptions: ['apple', 'banana', 'orange'],
            checkboxVal: defaultFormThead, // checkboxVal
            formThead: defaultFormThead // 默认表头 Default header
        }
    },
    watch: {
        checkboxVal(valArr) {
            this.formThead = this.formTheadOptions.filter(i => valArr.indexOf(i) >= 0)
            this.key = this.key + 1// 为了保证table 每次都会重渲 In order to ensure the table will be re-rendered each time
        }
    }
}
</script>
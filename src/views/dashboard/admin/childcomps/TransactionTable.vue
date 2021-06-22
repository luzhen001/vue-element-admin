<template>
    <el-table :data="list">
        <el-table-column label="编号" width="100">
            <template slot-scope="scope">No.{{scope.row.order_no}}</template>
        </el-table-column>
        <el-table-column label="标题" align="left">
            <template slot-scope="scope">{{scope.row.title}}</template>
        </el-table-column>
        <el-table-column label="价格" width="195" align="center">
            <template slot-scope="scope">¥{{scope.row.price}}</template>
        </el-table-column>
        <el-table-column label="状态" width="100" align="right">
            <template slot-scope="scope"><el-tag :type="scope.row.status">{{scope.row.status}}</el-tag></template>
        </el-table-column>
    </el-table>
</template>
<script>
import {randomString} from '@/utils/index'
export default {
    data() {
        return {
            list: null
        }
    },
    created() {
        let tempArr = [];
        let statusList = ['success','failed','pending','error','info'];
        for(let i=0; i<8; i++){
            tempArr.push({
                order_no: i+1,
                title:randomString(10)+'---'+i,
                price: (Math.random()*(1000+1)+100).toFixed(2),
                status:statusList[Math.floor(Math.random()*statusList.length)]
            });
        }
        this.list = tempArr;
    }
}
</script>
<style scoped>
    >>>.has-gutter > tr th{
        padding: 15px 0;
    }
</style>
<template>
    <div class="app-container">
        <div class="copy-wrap" v-for="item in dataList" :key="item.uid">
            <el-input v-model="item.title" placeholder="请填写内容..." class="copy-input" />
            <el-button type="primary" icon="el-icon-document" @click="handleCopy(item.uid,$event)">复制</el-button>
        </div>
    </div>
</template>
<script>
import clipBoard from 'utils/clipBoard'
import { getClipList } from 'api/index'
export default {
    name: 'clipboard',
    data () {
        return {
            dataList: []
        }
    },
    created () {
        this.getList();
    },
    methods: {
        //获取数据
        async getList () {
            // getClipList().then(res => {
            //     if (res.code === 0) {
            //         this.dataList = res.result;
            //     }
            // })
            const res = await getClipList();
            if(res.code !==0){
                return this.$message.error('出错了！');
            }
            this.dataList = res.result;

        },
        //复制
        handleCopy (text, event) {
            clipBoard(text, event);
        }
    }
}
</script>
<style lang="scss" scoped>
    .copy-wrap {
        margin-top: 20px;
        .copy-input {
            width: 700px;
            max-width: 100%;
            margin-right: 20px;
        }
    }
</style>
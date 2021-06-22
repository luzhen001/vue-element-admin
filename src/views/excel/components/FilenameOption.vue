<template>
    <div class="title">
        <label>文件名称: </label>
        <el-input v-model="filename" placeholder="请输入文件名称(默认为当前时间)" prefix-icon="el-icon-document" style="width:350px" />
    </div>
</template>
<script>
export default {
    props: {
        value: {
            type: String,
            default: ''
        }
    },
    computed: {
        filename: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit('input', val);
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.title{
    display: inline-block;
    color: #666;
    font-size: 15px;
}
</style>
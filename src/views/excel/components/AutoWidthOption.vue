<template>
    <div class="title">
        <label>自动宽度: </label>
        <el-radio-group v-model="autoWidth">
            <el-radio :label="true" border>True</el-radio>
            <el-radio :label="false" border>False</el-radio>
        </el-radio-group>
    </div>
</template>
<script>
export default {
    props: {
        value: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        autoWidth: {
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
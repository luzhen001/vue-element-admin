<template>
    <div class="title">
        <label>文档扩展名: </label>
        <el-select v-model="bookType" style="width:130px;">
            <el-option v-for="item in options" :key="item" :label="item" :value="item" />
        </el-select>
    </div>
</template>
<script>
export default {
    props: {
        value: {
            type: String,
            default: 'xlsx'
        }
    },
    data() {
        return {
            options: ['xlsx', 'csv', 'txt']
        }
    },
    computed: {
        bookType: {
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
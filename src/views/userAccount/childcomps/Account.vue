<template>
    <el-form>
        <el-form-item label="姓名">
            <el-input v-model.trim="user.name" />
        </el-form-item>
        <el-form-item label="邮箱">
            <el-input v-model.trim="user.email" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submit">确定</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
export default {
    props: {
        user: {
            type: Object,
            default: () => {
                return {
                    name: '',
                    email: ''
                }
            }
        }
    },
    methods: {
        submit() {
            this.$message({
                type: 'success',
                showClose:true,
                message: '个人信息修改成功！'
            });
        }
    }
}
</script>
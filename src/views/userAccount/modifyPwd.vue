<template>
    <div class="app-container">
        <el-card>
            <div slot="header" class="clearfix">
                <span>修改密码</span>
            </div>
            <el-col :span="10" :xs="24">
                <el-form ref="form" label-width="80px">
                    <el-form-item label="旧密码">
                        <el-input></el-input>
                    </el-form-item>
                    <el-form-item label="新密码">
                        <el-input></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码">
                        <el-input></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" v-waves>确定</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-card>
    </div>
</template>
<script>
import waves from 'directive/waves'
export default {
    directives:{waves},
    data() {
        return {

        }
    },
}
</script>
<style scoped>

</style>
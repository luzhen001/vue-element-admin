<template>
    <div class="login-container">
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">
            <div class="title-container">
                <h3 class="title">后台管理系统<i>V1.0.0</i></h3>
            </div>
            <el-form-item prop="username">
                <span class="svg-container"><svg-icon icon-class="user" /></span>
                <el-input
                    ref="username"
                    v-model="loginForm.username"
                    placeholder="账号"
                    name="username"
                    type="text"
                    tabindex="1"
                    autocomplete="on"
                />
            </el-form-item>
            <el-tooltip v-model="capsTooltip" content="大写键盘已打开" placement="right" manual>
                <el-form-item prop="password">
                    <span class="svg-container"><svg-icon icon-class="password" /></span>
                    <el-input
                        :key="passwordType"
                        ref="password"
                        v-model="loginForm.password"
                        :type="passwordType"
                        placeholder="密码"
                        name="password"
                        tabindex="2"
                        autocomplete="on"
                        @keyup.native="checkCapslock"
                        @blur="capsTooltip = false"
                        @keyup.enter.native="handleLogin"
                    />
                    <span class="show-pwd" @click="showPwd">
                        <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                    </span>
                </el-form-item>
            </el-tooltip>
            <el-form-item prop="userCode">
                <span class="svg-container"><svg-icon icon-class="yzm" /></span>
                <el-input
                    ref="userCode"
                    v-model="loginForm.userCode"
                    placeholder="验证码"
                    name="userCode"
                    type="text"
                    tabindex="3"
                    autocomplete="on"
                    maxlength="4"
                />
                <img src="@/assets/images/temp/yzm.png" class="yzm" alt="" />
            </el-form-item>
            <el-button :loading="loading" type="primary" class="login_btn" @click.native.prevent="handleLogin">登录</el-button>
            <div class="login-info">© 2020渠道商后台管理系统 - Powered By Admin</div>
        </el-form>
    </div>
</template>
<script>
import { validUsername } from 'utils/index'
export default {
    name: 'Login',
    data() {
        const validateUsername = (rule, value, callback) => {
            if (!validUsername(value)) {
                callback(new Error('请输入正确的账号！'));
            } else {
                callback();
            }
        }
        const validatePassword = (rule, value, callback) => {
            if (value.length < 6) {
                callback(new Error('请输入正确的密码！'));
            } else {
                callback();
            }
        }
        return {
            loginForm: {
                username: 'admin',
                password: '123456',
                userCode:'7364'
            },
            loginRules: {
                username: [{ required: true, trigger: 'blur', validator: validateUsername }],
                password: [{ required: true, trigger: 'blur', validator: validatePassword }]
            },
            passwordType: 'password',//密码类型
            capsTooltip: false,
            loading: false,
        }
    },
    mounted() {
        if (this.loginForm.username === '') {
            this.$refs.username.focus();
        } else if (this.loginForm.password === '') {
            this.$refs.password.focus();
        }
    },
    methods: {
        //大写键盘
        checkCapslock(e) {
            const { key } = e;
            this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z');
        },
        //是否明文显示密码
        showPwd() {
            if (this.passwordType === 'password') {
                this.passwordType = '';
            } else {
                this.passwordType = 'password';
            }
            this.$nextTick(() => {
                this.$refs.password.focus();
            });
        },
        //登录
        handleLogin() {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    this.loading = true;
                    this.$store.dispatch('user/login', this.loginForm).then(() => {
                        this.$router.push({ path:'/'});
                        this.loading = false;
                    }).catch(() => {
                        this.loading = false;
                    });
                } else {
                    return false;
                }
            });
        }
    }
}
</script>
<style lang="scss">
    .el-input {
        display: inline-block;
        width: 85%;
        height: 47px;
        input {
            background: transparent;
            border: 0px;
            -webkit-appearance: none;
            border-radius: 0px;
            padding: 12px 5px 12px 15px;
            color: #fff;
            height: 47px;
            caret-color: #fff;
            &:-webkit-autofill {
                box-shadow: 0 0 0px 1000px #283443 inset !important;
                -webkit-text-fill-color: #fff !important;
            }
        }
    }
    .el-form-item {
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        color: #454545;
    }
</style>
<style lang="scss" scoped>
    @supports (-webkit-mask: none) and (not (cater-color: #fff)) {
        .login-container .el-input input {
            color: #fff;
        }
    }
    .login-container {
        min-height: 100%;
        width: 100%;
        overflow: hidden;
        background-color: #2d3a4b;
        .login-form {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 460px;
            max-width: 100%;
            height: auto;
            overflow: hidden;
            transform: translate(-50%,-50%);
            .el-form-item {
                color: #454545;
                border-radius: 5px;
                background: rgba(0, 0, 0, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.1);
            }
            .svg-container {
                color: #fff;
                display: inline-block;
                vertical-align: middle;
                padding: 6px 0px 6px 10px;
                font-size: 18px;
            }
            .title-container {
                position: relative;
                .title {
                    color: #fff;
                    font-size: 28px;
                    font-weight: bold;
                    text-align: center;
                    margin: 0px auto 60px auto;
                    i{
                        color: #999;
                        font-size: 15px;
                        margin-left: 10px;
                        font-weight: normal;
                    }
                }
            }
            .show-pwd {
                position: absolute;
                right: 10px;
                top: 7px;
                cursor: pointer;
                font-size: 16px;
                color: #fff;
                user-select: none;
            }
            .yzm{
                width: 150px;
                height: 50px;
                position: absolute;
                right: 0;
            }
            .login_btn{
                width: 100%;
                height: 48px;
                font-size: 18px;
            }
            .login-info{
                color: #fff;
                font-size: 15px;
                margin-top: 20px;
                text-align: center;
            }
        }
    }
</style>
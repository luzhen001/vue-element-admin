<template>
    <div class="navbar">
        <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
        <breadcrumb id="breadcrumb-container" />
        <div class="right-menu">
            <template v-if="device!=='mobile'">
                <el-tooltip content="快捷搜索" :hide-after="hideAfter">
                    <header-search class="right-menu-item hover-effect" />
                </el-tooltip>
                <el-tooltip content="全屏" :hide-after="hideAfter">
                    <screen-full class="right-menu-item hover-effect" />
                </el-tooltip>
                <el-tooltip content="布局大小" :hide-after="hideAfter">
                    <size-select class="right-menu-item hover-effect" />
                </el-tooltip>
                <el-tooltip content="全局设置" :hide-after="hideAfter">
                    <global-settings class="right-menu-item hover-effect" />
                </el-tooltip>
            </template>
            <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="hover" @visible-change="downChange">
                <div class="avatar-wrapper">
                    <img :src="user.avatar" class="user-avatar">
                    <span class="user-name">欢迎您，{{user.name}}</span>
                    <i :class="isDropDown?'el-icon-caret-top':'el-icon-caret-bottom'" />
                </div>
                <el-dropdown-menu slot="dropdown">
                    <router-link to="/">
                        <el-dropdown-item icon="el-icon-price-tag">数据看板</el-dropdown-item>
                    </router-link>
                    <router-link to="/userAccount/index">
                        <el-dropdown-item divided icon="el-icon-user">个人中心</el-dropdown-item>
                    </router-link>
                    <router-link to="/userAccount/modifyPwd">
                        <el-dropdown-item divided icon="el-icon-lock">修改密码</el-dropdown-item>
                    </router-link>
                    <el-dropdown-item divided icon="el-icon-switch-button" @click.native="logOut">
                        <span>退出登录</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Breadcrumb from 'components/BreadCrumb'
import Hamburger from 'components/Hamburger'
import ScreenFull from 'components/ScreenFull'
import SizeSelect from 'components/SizeSelect'
import HeaderSearch from 'components/HeaderSearch'
import GlobalSettings from 'components/GlobalSettings'
export default {
    components: {
        Breadcrumb,
        Hamburger,
        ScreenFull,
        SizeSelect,
        HeaderSearch,
        GlobalSettings
    },
    computed: {
        ...mapGetters([
            'sidebar',
            'name',
            'avatar',
            'device'
        ])
    },
    data() {
        return {
            user:{},
            isDropDown: false,
            hideAfter:600
        }
    },
    created() {
        this.getUser();
    },
    methods: {
        downChange(e) {
            this.isDropDown = e;
        },
        toggleSideBar() {
            this.$store.dispatch('app/toggleSideBar');
        },
        getUser() {
            this.user = {
                name: this.name,
                avatar: this.avatar
            }
        },
        //退出登录
        logOut() {
            this.$confirm('确定要退出吗？','温馨提示',{
                confirmButtonText:'确定',
                cancelButtonText:'想一想',
                showClose:false,
                type:'info',
                dangerouslyUseHTMLString:true
            }).then(async()=>{
                await this.$store.dispatch('user/logOut');
                this.$router.push({path:'/login'});
            }).catch(()=>{})
        }
    }
}
</script>
<style lang="scss" scoped>
    .navbar {
        height: 50px;
        overflow: hidden;
        position: relative;
        background: #1997AE;
        box-shadow: 0 1px 4px rgba(0,21,41,.1);
        .hamburger-container {
            line-height: 46px;
            height: 100%;
            float: left;
            cursor: pointer;
            transition: background .3s;
            -webkit-tap-highlight-color:transparent;
            &:hover {
                background: rgba(0, 0, 0, .025)
            }
        }
        .right-menu {
            float: right;
            height: 100%;
            line-height: 50px;
            &:focus {
                outline: none;
            }
            .right-menu-item {
                display: inline-block;
                padding: 0 13px;
                height: 100%;
                font-size: 18px;
                color: #fff;
                vertical-align: text-bottom;
                &.hover-effect {
                    cursor: pointer;
                    transition: background .3s;
                    &:hover {
                        background: rgba(0, 0, 0, .025)
                    }
                }
            }
            .avatar-container {
                cursor: pointer;
                font-size: 13px;
                .avatar-wrapper {
                    height: 100%;
                    line-height: 50px;
                    .user-avatar {
                        width: 40px;
                        height: 40px;
                        cursor: pointer;
                        border-radius: 100%;
                        vertical-align: middle;
                    }
                }
            }
        }
    }
</style>
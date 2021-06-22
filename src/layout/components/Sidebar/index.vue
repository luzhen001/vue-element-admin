<template>
    <div :class="{'has-logo':showBarLogo}">
        <div class="sidebar-logo-container" v-if="showBarLogo">
            <transition name="sidebarLogoFade">
                <router-link class="sidebar-logo-link" to="/">
                    <img src="~assets/images/logo.png" class="sidebar-logo" />
                    <h2 class="sidebar-title">渠道商后台管理系统</h2>
                </router-link>
            </transition>
        </div>
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu
                :default-active="activeMenu"
                :collapse="isCollapse"
                :background-color="variables.menuBg"
                :text-color="variables.menuText"
                :unique-opened="true"
                :active-text-color="variables.menuActiveText"
                :collapse-transition="true"
                mode="vertical"
            >
                <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
            </el-menu>
        </el-scrollbar>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import variables from 'assets/styles/variables.scss'
export default {
    components: { SidebarItem },
    computed: {
        ...mapGetters([
            'permission_routes',
            'sidebar'
        ]),
        activeMenu() {
            const route = this.$route;
            const { meta, path } = route;
            if (meta.activeMenu) {
                return meta.activeMenu;
            }
            return path;
        },
        showBarLogo(){
            return this.$store.getters.isSideLogo;
        },
        variables() {
            return variables;
        },
        isCollapse() {
            return !this.sidebar.opened;
        }
    }
}
</script>
<style lang="scss" scoped>
    .sidebar-logo-container {
        position: relative;
        width: 100%;
        height: 50px;
        line-height: 50px;
        text-align: center;
        overflow: hidden;
        background: #1997AE;
        border-right:1px solid rgba(0,0,0,.05);
        & .sidebar-logo-link {
            height: 100%;
            width: 100%;
            & .sidebar-logo {
                width: 32px;
                height: 32px;
                margin-right: 10px;
                vertical-align: middle;
            }
            & .sidebar-title {
                display: inline-block;
                margin: 0;
                color: #fff;
                font-size: 14px;
                font-weight: 600;
                line-height: 50px;
                vertical-align: middle;
            }
        }
    }
</style>

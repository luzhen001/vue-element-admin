<template>
    <div :class="classObj" class="app-wrapper">
        <div v-if="device==='mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div>
        <sidebar class="sidebar-container" />
        <div :class="{hasTagsView:needTagsView}" class="main-container" >
            <div :class="{'fixed-header':fixedHeader}">
                <nav-bar />
                <tags-view v-if="needTagsView" />
            </div>
            <app-main />
        </div>
    </div>
</template>
<script>
import { AppMain, NavBar, Sidebar, TagsView } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState } from 'vuex'
export default {
    name: 'Layout',
    components: {
        AppMain,
        NavBar,
        Sidebar,
        TagsView,
    },
    mixins: [ResizeMixin],
    computed: {
        ...mapState({
            sidebar: state => state.app.sidebar,
            device: state => state.app.device,
            showSideBar:state=>state.app.showSideBar
        }),
        fixedHeader(){
            return this.$store.getters.isFixedHeader;
        },
        needTagsView(){
            return this.$store.getters.isTagsView;
        },
        classObj() {
            return {
                hideSidebar: !this.sidebar.opened,
                openSidebar: this.sidebar.opened,
                withoutAnimation: this.sidebar.withoutAnimation,
                mobile: this.device === 'mobile'
            }
        }
    },
    methods: {
        handleClickOutside() {
            this.$store.dispatch('app/closeSideBar', { withoutAnimation: false });
        }
    }
}
</script>
<style lang="scss" scoped>
    @import "assets/styles/mixin.scss";
    @import "assets/styles/variables.scss";
    .app-wrapper {
        @include clearfix;
        position: relative;
        height: 100%;
        width: 100%;
        &.mobile.openSidebar {
            position: fixed;
            top: 0;
        }
    }
    .drawer-bg {
        width: 100%;
        height: 100%;
        top: 0;
        position: absolute;
        z-index: 999;
        background: rgba(0,0,0,.3);
    }
    .fixed-header {
        position: fixed;
        top: 0;
        right: 0;
        z-index: 9;
        padding-right: 0;
        width: calc(100% - #{$sideBarWidth});
        transition: width 0.28s;
    }
    .hideSidebar .fixed-header {
        width: calc(100% - 54px)
    }
    .mobile .fixed-header {
        width: 100%;
    }
</style>
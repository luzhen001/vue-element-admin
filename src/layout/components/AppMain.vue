<template>
    <section class="app-main">
        <transition name="fade-transform" mode="out-in">
            <keep-alive :include="cachedViews">
                <router-view :key="key" />
            </keep-alive>
        </transition>
    </section>
</template>
<script>
export default {
    name: 'AppMain',
    computed: {
        cachedViews() {
            return this.$store.state.tagsView.cachedViews;
        },
        key() {
            return this.$route.path;
        }
    }
}
</script>
<style lang="scss" scoped>
    .app-main {
        width: 100%;
        overflow: hidden;
        position: relative;
        // min-height: calc(100vh - 50px);
        // border:1px solid red;
    }
    .fixed-header+.app-main {
        padding-top: 50px;
    }
    .hasTagsView {
        // .app-main {
        //     min-height: calc(100vh - 94px);
        // }
        .fixed-header+.app-main {
            padding-top: 94px;
        }
    }
</style>
<style lang="scss">
    .el-popup-parent--hidden {
        .fixed-header {
            padding-right: 15px;
        }
    }
</style>
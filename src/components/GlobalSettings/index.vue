<template>
    <div>
        <div style="padding-top:2px;">
            <svg-icon class-name="set-icon" icon-class="set" @click="showDrawerBtn" />
        </div>
        <el-drawer :visible.sync="showDrawer" :size="size" :withHeader="false" :append-to-body="true">
            <div class="drawer-container">
                <div class="drawer-item">
                    <h3>系统布局配置</h3>
                    <i class="drawer-close el-icon-close" @click="showDrawerBtn"></i>
                </div>
                <!-- <div class="drawer-item">
                    <span>选择主题颜色</span>
                    <theme-picker class="drawer-picker" @change="themeChange" />
                </div> -->
                <div class="drawer-item">
                    <span>是否开启Tags-View</span>
                    <el-switch class="drawer-switch" v-model="showTagsView" />
                </div>
                <div class="drawer-item">
                    <span>是否固定Head-Bar</span>
                    <el-switch class="drawer-switch" v-model="fixedHeader" />
                </div>
                <div class="drawer-item">
                    <span>是否显示侧栏Logo</span>
                    <el-switch class="drawer-switch" v-model="showBarLogo" />
                </div>
                <div class="drawer-item">
                    <span>菜单支持拼音搜索</span>
                    <el-switch class="drawer-switch" v-model="supportPinyinSearch" />
                </div>
            </div>
        </el-drawer>
    </div>
</template>
<script>
// import themePicker from '@/components/ThemePicker'
export default {
    // components: { themePicker },
    name:'globalSettings',
    data() {
        return {
            size:260+'px',
            showDrawer:false
        }
    },
    computed: {
        showTagsView: {
            get() {
                return this.$store.getters.isTagsView;
            },
            set(val) {
                this.$store.dispatch('app/setTagsView', val);
            }
        },
        fixedHeader: {
            get() {
                return this.$store.getters.isFixedHeader;
            },
            set(val) {
                this.$store.dispatch('app/setFixedHeader', val);
            }
        },
        showBarLogo: {
            get() {
                return this.$store.getters.isSideLogo;
            },
            set(val) {
                this.$store.dispatch('app/setSidebarLogo', val);
            }
        },
        supportPinyinSearch: {
            get() {
                return this.$store.getters.isPinyinSearch;
            },
            set(val) {
                this.$store.dispatch('app/setPinyinSearch', val);
            }
        }
    },
    methods: {
        themeChange(val) {
            this.$store.dispatch('app/setThemeColor',val);
            this.refreshView();
            // this.$store.dispatch('settings/changeSetting', {
            //     key: 'theme',
            //     value: val
            // });
        },
        refreshView() {
            this.$store.dispatch('tagsView/delAllCachedViews', this.$route);
            const { fullPath } = this.$route;
            this.$nextTick(() => {
                this.$router.replace({
                    path: '/redirect' + fullPath
                });
            });
        },
        showDrawerBtn(){
            this.showDrawer = !this.showDrawer;
        }
    }
}
</script>
<style lang="scss" scoped>
    .set-icon{
        cursor: pointer;
        font-size: 22px;
        vertical-align: middle;
    }
    .drawer-container {
        padding: 24px;
        font-size: 14px;
        line-height: 1.5;
        word-wrap: break-word;
        h3 {
            font-size: 18px;
            font-weight: bold;
            color: rgba(0, 0, 0, .85);
        }
        .drawer-close{
            cursor: pointer;
            font-size: 20px;
            &:hover{
                opacity: .5;
                transition:all 1s;
            }
        }
        .drawer-item {
            font-size: 14px;
            padding: 12px 0;
            overflow: hidden;
            color: rgba(0, 0, 0, .65);
             display: flex;
            align-items: center;
            justify-content: space-between;
        }
    }
</style>
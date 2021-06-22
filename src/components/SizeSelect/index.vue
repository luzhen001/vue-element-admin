<template>
    <el-dropdown trigger="click" @command="handleSetSize" placement="bottom-start">
        <div>
            <svg-icon class-name="size-icon" icon-class="size" />
        </div>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="item of sizeOptions" :key="item.value" :disabled="size===item.value" :command="item.value">
                {{item.label}}
            </el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>
<script>
export default {
    data() {
        return {
            sizeOptions: [
                { label: '默认布局', value: 'default' },
                { label: '中等布局', value: 'medium' },
                { label: '较小布局', value: 'small' },
                { label: '迷你布局', value: 'mini' }
            ]
        }
    },
    computed: {
        size() {
            return this.$store.getters.size;
        }
    },
    methods: {
        handleSetSize(size) {
            this.$ELEMENT.size = size;
            this.$store.dispatch('app/setSize', size);
            this.refreshView();
            let sizeIndex = 0;
            for(let i in this.sizeOptions){
                if(this.sizeOptions[i].value === size){
                    sizeIndex = i;
                }
            }
            this.$message({
                type: 'success',
                showClose:true,
                message: '['+this.sizeOptions[sizeIndex].label+']切换成功！'
            });
        },
        refreshView() {
            this.$store.dispatch('tagsView/delAllCachedViews', this.$route);
            const { fullPath } = this.$route;
            this.$nextTick(() => {
                this.$router.replace({
                    path: '/redirect' + fullPath
                });
            });
        }
    }
}
</script>
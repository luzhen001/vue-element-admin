<template>
    <div>
        <svg-icon :icon-class="isFullscreen ? 'exit-fullscreen' : 'fullscreen'" @click="clickScreenBtn" />
    </div>
</template>
<script>
import screenfull from 'screenfull'
export default {
    name: 'screenFull',
    data() {
        return {
            isFullscreen: false
        }
    },
    mounted() {
        this.initScreenFull();
    },
    beforeDestroy() {
        this.destroyScreenFull();
    },
    methods: {
        clickScreenBtn() {
            if (!screenfull.enabled) {
                this.$message({
                    type: 'warning',
                    showClose: true,
                    message: '抱歉，你的浏览器不支持全屏哦！'
                });
                return false;
            }
            screenfull.toggle();
        },
        changeScreenFull() {
            this.isFullscreen = screenfull.isFullscreen;
        },
        initScreenFull() {
            if (screenfull.enabled) {
                screenfull.on('change', this.changeScreenFull);
            }
        },
        destroyScreenFull() {
            if (screenfull.enabled) {
                screenfull.off('change', this.changeScreenFull);
            }
        }
    }
}
</script>

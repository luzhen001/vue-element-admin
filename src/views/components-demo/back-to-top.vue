<template>
    <div class="app-container">
        <div class="tip">页面滚动到指定位置会在右下角出现返回顶部按钮</div>
        <div class="tip">可自定义按钮的样式、show/hide、出现的高度、返回的位置 如需文字提示，可在外部使用Element的el-tooltip元素</div>
        <div class="placeholder-container">
            <div v-for="(item,index) in listData" :key="index" :style="{background:item.bg}">{{item.title}}</div>
        </div>
        <back-to-top :custom-style="backToTopStyle" :visibility-height="300" :back-position="0" transition-name="fade" />
    </div>
</template>
<script>
import BackToTop from 'components/BackToTop'
export default {
    name: 'BackToTopDemo',
    components: { BackToTop },
    data() {
        return {
            listData:[
                {'title':'000000','bg':'#409EFF'},
                {'title':'111111','bg':'#67C23A'},
                {'title':'222222','bg':'#E6A23C'},
                {'title':'333333','bg':'#F56C6C'},
                {'title':'444444','bg':'#909399'},
                {'title':'555555','bg':'#303133'},
                {'title':'666666','bg':'#e93038'},
                {'title':'888888','bg':'#2fcc78'},
                {'title':'999999','bg':'#39b7d6'},
                {'title':'101010','bg':'#009A61'}
            ],
            backToTopStyle: {
                right: '20px',
                bottom: '30px',
                width: '40px',
                height: '40px',
                'border-radius': '6px',
                'line-height': '45px',
                background: '#e7eaf1'
            }
        }
    }
}
</script>
<style scoped lang="scss">
    .placeholder-container div {
        width: 100%;
        height: 300px;
        display: flex;
        color: #fff;
        margin: 30px auto;
        align-items: center;
        justify-content: center;
    }
    .tip {
        background: #eef1f6;
        padding: 8px 24px;
        margin-bottom: 20px;
        border-radius: 2px;
        display: block;
        line-height: 32px;
        font-size: 16px;
        color: #2c3e50;
        a {
            color: #337ab7;
            cursor: pointer;
            &:hover {
                color: rgb(32, 160, 255);
            }
        }
    }
</style>
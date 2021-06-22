<template>
    <div class="app-container">
        <div class="tip">富文本是管理后台一个核心的功能，但同时又是一个有很多坑的地方。在选择富文本的过程中我也走了不少的弯路，市面上常见的富文本都基本用过了，最终权衡了一下选择了Tinymce。更详细的富文本比较和介绍见
            <a target="_blank" class="link-type" href="https://panjiachen.github.io/vue-element-admin-site/feature/component/rich-editor.html">文档</a>
        </div>
        <div>
            <tinymce v-model="content" :height="300" />
        </div>
        <div class="tiny-content" v-html="content" />
    </div>
</template>
<script>
import Tinymce from 'components/Tinymce'
export default {
    name: 'TinymceDemo',
    components: { Tinymce },
    data() {
        return {
            content:''
        }
    }
}
</script>
<style scoped lang="scss">
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
    .tiny-content{
        margin-top: 20px;
    }
</style>
<template>
  <div class="app-container">
    <div class="tip">
      Based on <a class="link-type" href="https://github.com/rowanwins/vue-dropzone"> dropzone </a>.
      由于我司业务有特殊需求，而且要传七牛 所以没用第三方，选择了自己封装。代码非常的简单，具体代码你可以在这里看到 @/components/Dropzone
    </div>
    <div class="editor-container">
      <dropzone id="myVueDropzone" url="https://httpbin.org/post" @dropzone-removedFile="dropzoneR" @dropzone-success="dropzoneS" />
    </div>
  </div>
</template>
<script>
import Dropzone from 'components/Dropzone'
export default {
  name: 'DropzoneDemo',
  components: { Dropzone },
  methods: {
    dropzoneS(file) {
      console.log(file)
      this.$message({ message: '上传成功！', type: 'success' })
    },
    dropzoneR(file) {
      console.log(file)
      this.$message({ message: '删除成功！', type: 'success' })
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
</style>
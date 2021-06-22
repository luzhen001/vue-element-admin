<template>
  <div class="app-container">
    <div class="tip" style="margin-top:15px;">这里使用 window.print() 来实现下载pdf的功能</div>
    <router-link target="_blank" to="/pdf/download">
      <el-button type="primary">点击下载PDF</el-button>
    </router-link>
  </div>
</template>
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
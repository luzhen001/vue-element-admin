<template>
  <div class="app-container">
    <el-alert :closable="false" title="这里是路由嵌套页面一">
      <router-view />
    </el-alert>
  </div>
</template>

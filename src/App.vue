<template>
<div id="app">
  <header class="header">
    <el-row>
      <el-col :span="24">
        <el-menu theme="dark" default-active="/" class="el-menu-demo" mode="horizontal">
          <el-menu-item>欢迎使用系统</el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </header>

  <main>
    <div class="main-left">
      <el-menu :collapse="isCollapse" class="el-menu-vertical-demo" :router="true">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">QuickLook</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/operator_pro">运营商数据</el-menu-item>
            <el-menu-item index="/ecommerce">电商数据</el-menu-item>
            <el-menu-item index="/wechat">微信数据</el-menu-item>
            <el-menu-item index="/jd">京东数据</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span slot="title">导航二</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/record">淘宝交易记录</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span slot="title">导航三</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="3-1">运营商数据</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>

    <div class="main-right">
      <router-view class="view"></router-view>
    </div>
  </main>
</div>
</template>

<script>
export default {
  name: 'app',
  data: function() {
    return {
      isCollapse: true
    }
  }
}
</script>

<style>
body {
  margin: 0;
}

#app {
  margin: 0 auto;
  font-family: "Helvetica Neue", "PingFang SC", Arial, sans-serif;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

header {
  z-index: 1000;
  transition: all 0.5s ease;
  border-top: solid 0px #3091F2;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
}

header.header-fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}

header .el-menu-demo {
  padding-left: 0px!important;
  text-align: center;
}

main {
  display: -webkit-box;
  display: -ms-flexbox;
  min-height: 700px;
  border: solid 40px #E9ECF1;
  background-color: #FCFCFC;
}

main .main-left {
  text-align: center;
  /*-webkit-box-flex: 0;
  -ms-flex: 0 0 200px;
  flex: 0 0 200px;*/
}

main .main-right {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  background-color: #fff;
  padding: 50px 40px;
}

main .el-menu {
  background-color: transparent!important;
}

main .demo-table-expand {
  font-size: 0;
}

main .demo-table-expand label {
  width: 120px;
  color: #99a9bf;
}

main .demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 25%;
}
</style>

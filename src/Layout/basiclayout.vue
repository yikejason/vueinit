<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <a-layout-sider v-model="collapsed" collapsible width="256px">
        <div class="logo">同岳管理后台</div>
        <sidelayout></sidelayout>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0" >
          <Header></Header>
      </a-layout-header>
      <a-layout-content style="margin: 0 16px">
          <router-view></router-view>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        <Footer></Footer>
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
import Header from './Header.vue'
import Footer from './Footer.vue'
import sidelayout from './sidelayout.vue'

export default {
  data() {
    return {
      collapsed: false,
    };
  },
  components:{
      Header,
      Footer,
      sidelayout
  }
};
</script>

<style>
#components-layout-demo-side .logo {
  height: 22px;
  /* background: rgba(255, 255, 255, 0.2); */
  margin-top: 16px;
  margin-bottom: 20px;
  text-align: center;
  font-size: 25px;
  color: white;
}
.layoutSide{width: 256px;}
</style>

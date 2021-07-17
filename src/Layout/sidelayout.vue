<template>
  <div style="width: 256px">
    <a-menu
      :default-selected-keys="['1']"
      :default-open-keys="['sub1']"
      mode="inline"
      theme="dark"
      :inline-collapsed="collapsed"
    >
      <a-menu-item key="1">
        <router-link to="/admin"></router-link>
        <a-icon type="pie-chart" />
        <span>用户管理</span>
      </a-menu-item>
      <a-menu-item key="2">
        <router-link to="/info"></router-link>
        <a-icon type="desktop" />
        <span>手动消息管理</span>
      </a-menu-item>
      <a-menu-item key="3">
        <router-link to="/about"></router-link>
        <a-icon type="inbox" />
        <span>关于我们</span>
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      collapsed: true,
    };
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
  },
};
</script>

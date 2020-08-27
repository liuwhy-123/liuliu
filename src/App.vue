<template>
  <div class="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: "App",
};
</script>
<style lang="scss">
@import "assets/css/base.css";

html,
body {
  overflow: hidden;
  height: 100%;
  width: 100%;
}
.app {
  overflow: hidden;
  height: 100%;
  width: 100%;
}
</style>

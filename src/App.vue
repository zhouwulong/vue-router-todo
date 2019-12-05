<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {

  }
}
</script>

<style lang="less">
html,body{
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
#app{
  height: 100%;
  width: 100%;
}
</style>

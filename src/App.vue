<template>
  <div id="hx" class="fillcontain" :style="{height:winHeight}">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      winHeight:document.documentElement.clientHeight+'px',
    }
  }
}
</script>

<style>
#hx {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: hidden;
}
</style>

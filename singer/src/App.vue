<template>
  <div id="app">
    <v-hello></v-hello>
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
import hello from './components/hello';
export default {
    components:{
      'v-hello':hello
    }
};
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>

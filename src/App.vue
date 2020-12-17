<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created: function () {
    console.log(1)
    let SPALoading = document.getElementById('loading')
    if (SPALoading !== null) {
      document.body.removeChild(SPALoading)
    }
  }
}
</script>

<style>
html,body{
  margin: 0;
  padding:0;
  height:100%
}
#app {
  height:100%;
  font-family: 'Microsoft Yahei';
  /* overflow: hidden; */
}
</style>

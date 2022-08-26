<template>
  <div class="logo-container">
    <svg class="logo" viewBox="0 0 453 154" @click="$router.push('/')">
      <use xlink:href="#logo"></use>
    </svg>
  </div>
  <router-view></router-view>
</template>

<script>
export default {
  components: {},
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Nunito', sans-serif;
}
.logo-container {
  display: flex;
  justify-items: center;
  justify-content: center;
  align-content: center;
  align-items: center;
  margin-top: 15px;
  margin-bottom: 30px;
  .logo {
    width: 300px;
    height: 100px;
  }
}
</style>

<template>
  <div id="flashMessage" v-if="GStore.flashMessage">
    {{ GStore.flashMessage }}
  </div>
  <img alt="Vue logo" src="./assets/logo.png" width="50" height="60" />
  <Calc msg="Подсчет цены затраченной электроэнергии" />
</template>

<script>
import Calc from "./components/Calc.vue";

export default {
  inject: ["GStore"],
  name: "App",
  components: {
    Calc: Calc,
  },
};
</script>

<style>
@keyframes yellowfade {
  from {
    background: yellow;
  }
  to {
    background: transparent;
  }
}

#flashMessage {
  animation-name: yellowfade;
  animation-duration: 3s;
  position: fixed;
  left: 0;
  right: 0;
  margin: -15px auto 5px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}
img {
  margin-top: 20px;
}
</style>

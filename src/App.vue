<template>
  <AppCore @updated="update()" :key="key" />
</template>

<script>

import AppCore from "@/components/AppCore.vue";

export default {
  name: 'App',
  components: {
    AppCore,
  },
  data() {
    return {
      key: true
    }
  },
  methods: {
    update() {
      this.key = !this.key;
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

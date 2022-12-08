<script setup lang="ts">
import { RouterView } from 'vue-router'
import { NMessageProvider } from 'naive-ui'
</script>

<template>
  <NMessageProvider>
    <div class="app">
      <RouterView />
    </div>
  </NMessageProvider>
</template>

<style scoped>
.app {
  width: 100%;
  height: 100%;
}
</style>
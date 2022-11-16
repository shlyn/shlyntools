<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderWidget from './HeaderWidget.vue'
import FooterWidget from './FooterWidget.vue'

</script>

<template>
    <div class="layout-wrapper">
        <div class="layout-header">
            <HeaderWidget />
        </div>
        <RouterView />
        <div class="layout-footer">
            <FooterWidget />
        </div>
    </div>
</template>
<style lang="scss" scoped>
.layout-wrapper {
    min-height: 100vh;
    padding: 2rem;
}
</style>
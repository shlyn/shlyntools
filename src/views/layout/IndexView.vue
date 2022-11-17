<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderWidget from './HeaderWidget.vue'
import FooterWidget from './FooterWidget.vue'

</script>

<template>
    <div class="layout-wrapper">
        <header class="header">
            <HeaderWidget />
        </header>
        <main class="main">
            <RouterView />
        </main>
        <footer class="footer">
            <FooterWidget />
        </footer>
    </div>
</template>
<style lang="scss" scoped>
.layout-wrapper {
    width: 100%;
    height: 100%;
    .header {
        width: 100%;
        height: 64px;
        position: sticky;
        top: 0;
        left: auto;
        right: 0;
        z-index: 1000;
        background-color: white;
    }
    .main {
        width: 100%;
        height: calc(100vh - 140px);
        padding: 24px;
    }
    .footer {
        width: 100%;
        height: 76px;
    }
}
</style>
<script setup lang="ts">
import { NResult } from 'naive-ui'
</script>

<template>
    <div class="wrapper">
        <NResult status="404" title="404" description="Life is a bit ridiculous">
            <template #footer>
                Have some fun
            </template>
        </NResult>
    </div>
</template>

<style scoped>
.wrapper {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
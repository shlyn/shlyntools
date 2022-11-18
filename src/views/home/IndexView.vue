<script setup lang="ts">
import { onMounted } from 'vue'
import { testQuery } from "@/graphql/xen"

onMounted(async () => {
    const res = await testQuery()
    console.log(res.data)
})
</script>
<template>
    <div class="home-wrapper">
        home
    </div>
</template>

<style lang="scss" scoped>
.home-wrapper {
    box-sizing: border-box;
}
</style>
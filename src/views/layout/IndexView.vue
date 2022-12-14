<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import { menuOptions } from '@/config/app.config'
// darkTheme
import { NConfigProvider, NLayout, NLayoutSider, NMenu } from 'naive-ui'
import type { GlobalThemeOverrides } from 'naive-ui'
import HeaderWidget from './HeaderWidget.vue'

const collapsed = ref(true)
const activeKey = ref<string | null>(null)

const themeOverrides: GlobalThemeOverrides = {
    Button: {}
}

// const appTheme = darkTheme
const appTheme = undefined
</script>

<template>
    <NConfigProvider :theme="appTheme" :theme-overrides="themeOverrides">
        <NLayout has-sider>
            <NLayoutSider bordered collapse-mode="width" :collapsed-width="64" :width="240" :collapsed="collapsed"
                show-trigger @collapse="collapsed = true" @expand="collapsed = false">
                <NMenu v-model:value="activeKey" :collapsed="collapsed" :collapsed-width="64" :collapsed-icon-size="22"
                    :options="menuOptions" />
            </NLayoutSider>
            <NLayout>
                <div class="layout-wrapper">
                    <header class="header">
                        <HeaderWidget />
                    </header>
                    <main class="main">
                        <RouterView />
                    </main>
                </div>
            </NLayout>
        </NLayout>
    </NConfigProvider>
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
    }

    .main {
        width: 100%;
        height: calc(100vh - 64px);
        overflow: hidden;
        overflow-y: auto;
        padding: 24px;
        background-color: rgba(250,250,250,0.8);
    }

    .footer {
        width: 100%;
        height: 76px;
    }
}
</style>
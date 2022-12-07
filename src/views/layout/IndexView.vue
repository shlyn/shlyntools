<script setup lang="ts">
import { ref, h, type Component } from 'vue'
import { RouterView, RouterLink } from 'vue-router'
import { NConfigProvider, NSpace, darkTheme, NLayout, NLayoutSider, NMenu, NIcon } from 'naive-ui'
import type { GlobalThemeOverrides, MenuOption } from 'naive-ui'
import HeaderWidget from './HeaderWidget.vue'
import FooterWidget from './FooterWidget.vue'
import {
    BookOutline as BookIcon,
    PersonOutline as PersonIcon,
    WineOutline as WineIcon,
    HomeOutline as HomeIcon
} from '@vicons/ionicons5'

const collapsed = ref(true)
const activeKey = ref<string | null>(null)

const themeOverrides: GlobalThemeOverrides = {
    Button: {
        textColor: 'red'
    }
}

// const appTheme = darkTheme
const appTheme = undefined
console.log(darkTheme)

const renderIcon = (icon: Component) => {
    return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions: MenuOption[] = [
    {
        label: () => h(
            RouterLink,
            {
                to: {
                    name: 'home'
                }
            },
            {
                default: () => "Home"
            }
        ),
        key: 'menu_item_home',
        icon: renderIcon(HomeIcon)
    },
    {
        label: 'XENCrypto',
        key: 'menu_item_xen_crypto',
        icon: renderIcon(BookIcon),
        children: [
            {
                label: () => h(
                    RouterLink,
                    {
                        to: {
                            name: 'xenManualMint',
                            // path: '/xen-manual-mint'
                        }
                    },
                    {
                        default: () => "Manual batch mint"
                    }
                ),
                key: "xen_crypto_manual_batch_mint"
            }
        ]
    },
    {
        key: 'divider-1',
        type: 'divider',
        props: {
            style: {
                marginLeft: '32px'
            }
        }
    }
]
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
                    <footer class="footer">
                        <FooterWidget />
                    </footer>
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
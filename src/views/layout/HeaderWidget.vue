<script setup lang="ts">
import { ref, h, type VNode } from 'vue'
import { NSelect, NTooltip, type SelectOption } from 'naive-ui'

const chainId = ref(null)

const renderOption = ({ node, option }: { node: VNode; option: SelectOption }) => h(
    NTooltip,
    {
        style: {
            width: '150px'
        }
    },
    {
        trigger: () => node,
        default: () => option.label
    })

const networkOptions = ref<SelectOption[]>([
    {
        label: 'Ethereum-Mainnet',
        value: 1
    },
    {
        label: 'Goerli-Test',
        value: 5
    },
    {
        label: 'BSC-Mainnet',
        value: 55
    },
    {
        label: 'BSC-Test',
        value: 97
    }
])
</script>
<template>
    <div class="header-wrapper">
        <div class="left-bar">
            <ul class="menu-list">
                <li class="menu-item uppercase">Header</li>
            </ul>
        </div>
        <div class="right-bar">
            <ul class="button-list">
                <li class="button-item network">
                    <NSelect v-model:value="chainId" :options="networkOptions" :render-option="renderOption" />
                </li>
            </ul>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.header-wrapper {
    height: 100%;
    padding: 0 24px;
    font-size: 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

    .left-bar {
        .menu-list {
            display: flex;
            flex-direction: row;

            .menu-item {
                min-width: 64px;
                padding: 6px 8px;
                margin-left: 12px;
                font-weight: 500;
                border-radius: 4px;
                user-select: none;
                color: rgba(0, 0, 0, 0.6);
                font-size: 18px;
                line-height: 1.75;
                cursor: pointer;
            }
        }
    }

    .right-bar {
        .button-list {
            display: flex;

            .network {
                width: 128px;
            }
        }
    }
}
</style>
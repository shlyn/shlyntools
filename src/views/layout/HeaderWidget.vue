<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useUserInfoStore } from '@/stores/app'
import { NSelect, NButton, NEllipsis, useMessage } from 'naive-ui'
import type { SelectGroupOption } from 'naive-ui'
import { networkOptionList } from '@/config/app.config'
import { metamaskDetect, walletRequest, listenWalletEvent, removeWalletEvent } from '@/utils/wallet-connect.util'

const userInfoStore = useUserInfoStore()
const message = useMessage()

const chainId = ref('0x1')
const networkOptions = ref<SelectGroupOption[]>(networkOptionList)

const connectBtnType = ref<'error' | 'primary'>('error')

onMounted(async () => {
    await init()
})

onUnmounted(() => {
    userInfoStore.clearUserInfo()
    removeWalletEventListener()
})

const init = async () => {
    removeWalletEventListener()
    if (metamaskDetect()) {
        await toConnect()
    }
}

// Connect wallet
const toConnect = async () => {
    try {
        const accounts = await walletRequest({ method: 'eth_requestAccounts' })
        connectBtnType.value = 'primary'
        chainId.value = await walletRequest({ method: 'eth_chainId' })
        userInfoStore.setUserInfo({ address: accounts[0], chainId: chainId.value })
        startWalletEventListen()
    } catch (err: any) {
        connectBtnType.value = 'error'
        userInfoStore.clearUserInfo()
        message.error('Connot connect the wallet.')
        // message.error(err.message)
    }
}

const onAccountsChanged = (args: unknown) => {
    if (Array.isArray(args) && args.length > 0) {
        window.location.reload()
    } else {
        connectBtnType.value = 'error'
        userInfoStore.clearUserInfo()
    }
}

const onChainChanged = async() => {
    window.location.reload()
}

const onWalletMessage = (args: unknown) => {
    if (typeof args == 'string') {
        message.info(args)
    }
}

const onSelectUpdate = async (value: string) => {
    try {
        await walletRequest({ method: 'wallet_switchEthereumChain', params: [{ chainId: value }] })
    } catch(err: unknown) {
        connectBtnType.value = 'error'
        userInfoStore.clearUserInfo()
    }
}

const startWalletEventListen = () => {
    listenWalletEvent('accountsChanged', onAccountsChanged)
    listenWalletEvent('chainChanged', onChainChanged)
    listenWalletEvent('message', onWalletMessage)
}

const removeWalletEventListener = () => {
    removeWalletEvent('accountsChanged', onAccountsChanged)
    removeWalletEvent('chainChanged', onChainChanged)
    removeWalletEvent('message', onWalletMessage)
}
</script>
<template>
    <div class="header-wrapper">
        <div class="left-bar">
            <ul class="menu-list">
                <li class="menu-item">^_^</li>
            </ul>
        </div>
        <div class="right-bar">
            <ul class="button-list">
                <li class="button-item network">
                    <NSelect v-model:value="chainId" :options="networkOptions" :on-update:value="onSelectUpdate" />
                </li>
                <li class="button-item">
                    <NButton :type="connectBtnType" round ghost @click="toConnect">
                        <NEllipsis style="max-width: 120px;">{{ userInfoStore.currentAddress || 'Connect Wallet' }}</NEllipsis>
                    </NButton>
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
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    position: relative;
    z-index: 9999;

    .left-bar {
        .menu-list {
            display: flex;
            flex-direction: row;

            .menu-item {
                min-width: 64px;
                text-align: left;
                padding: 6px 8px;
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

            .button-item {
                margin-left: 12px;

                &:first-child {
                    margin-left: 0;
                }
            }
        }
    }
}
</style>
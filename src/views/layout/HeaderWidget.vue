<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { NSelect, NButton, NEllipsis, useMessage } from 'naive-ui'
import { metamaskDetect, walletRequest, listenWalletEvent, removeWalletEvent } from '@/utils/wallet-connect.util'
import { ConnectInfoStored } from '@/utils/storage.util'
import type { SelectGroupOption } from 'naive-ui'

const message = useMessage()
const chainId = ref(null)
const networkOptions = ref<SelectGroupOption[]>([
    {
        type: 'group',
        label: 'Mainnet Network',
        key: 'mainnet_',
        children: [
            {
                label: 'Ethereum',
                value: 1,
            },
            {
                label: 'Polygon',
                value: 100,
                disabled: true
            },
            {
                label: 'BSC',
                value: 55,
                disabled: true
            },
        ]
    },
    {
        type: 'group',
        label: 'Test Network',
        key: 'test_',
        children: [
            {
                label: 'Goerli',
                value: 5
            },
            {
                label: 'BSC-Test',
                value: 97,
                disabled: true
            }
        ]
    }
])
const connectBtnType = ref<'error' | 'primary'>('error')
const connectBtnText = ref('Please Connect Wallet')

onMounted(async () => {
    await init()
})

onUnmounted(() => {
    removeWalletEventListener()
})

const init = async () => {
    if (metamaskDetect()) {
        removeWalletEventListener()
        await toConnect()
    }
}

// Connect wallet
const toConnect = async () => {
    try {
        const accounts = await walletRequest({ method: 'eth_requestAccounts' })
        connectBtnType.value = 'primary'
        connectBtnText.value = accounts[0]
        const chainId = await walletRequest({ method: 'eth_chainId' })
        ConnectInfoStored.value = { address: accounts[0], chainId }
        startWalletEventListen()
    } catch (err: any) {
        connectBtnType.value = 'error'
        connectBtnText.value = 'Please Connect Wallet'
        ConnectInfoStored.clear()
        message.error(err.message)
    }
}

const onAccountsChanged = (args: unknown) => {
    if (Array.isArray(args) && args.length > 0) {
        connectBtnType.value = 'primary'
        connectBtnText.value = args[0]
        ConnectInfoStored.value = { ...ConnectInfoStored.value, address: args[0] }
    } else {
        connectBtnType.value = 'error'
        connectBtnText.value = 'Please Connect Wallet'
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
                <li class="menu-item uppercase">Header</li>
            </ul>
        </div>
        <div class="right-bar">
            <ul class="button-list">
                <li class="button-item network">
                    <NSelect v-model:value="chainId" :options="networkOptions" />
                </li>
                <li class="button-item">
                    <NButton :type="connectBtnType" round ghost @click="toConnect">
                        <NEllipsis style="max-width: 80px;">{{ connectBtnText }}</NEllipsis>
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
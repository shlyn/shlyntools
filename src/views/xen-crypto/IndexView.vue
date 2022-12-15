<script setup lang="ts">
import { reactive, ref, onMounted, watch } from 'vue'
import { useUserInfoStore } from '@/stores/app'
import { useMessage, NGradientText, NFormItem, NInputNumber, NButton, NEmpty, NSpace, NTag } from 'naive-ui'
import MintedItem from '@/components/MintedItem.vue'
import { userMintIndex, batchMint, batchClaim, batchReuseMint, batchClaimAndMint } from '@/api/rpc/XENFactory.rpc'
import { getBatchCreate2Address } from '@/utils/contract.util'

const userInfoStore = useUserInfoStore()
const message = useMessage()

const userAddress = ref('')

const mintParams = reactive({
    count: 1,
    term: 1
})

const mintRefer = reactive({
    globalRank: 0,
    AMP: '00',
    EAA: '00'
})

const mintedTotal = ref('0')
const mintedList = ref<string[]>([])
const mintLoading = ref(false)

const selectedItems = ref<string[]>([])

watch(userInfoStore.userInfo, async (val) => {
    if (val.address !== userAddress.value) {
        userAddress.value = val.address
    }
    await initData()
}, { deep: true })

onMounted(async () => {
    // await initData()
})

const initData = async () => {
    if (userAddress.value) {
        try {
            mintedTotal.value = await userMintIndex(userAddress.value)
            const deployer = import.meta.env.VITE_ADDRESS_XEN_FACTORY
            const byteCodeAddress = import.meta.env.VITE_ADDRESS_XEN_PROXY_IMPLEMENTAION
            mintedList.value = getBatchCreate2Address(deployer, byteCodeAddress, userAddress.value, Array.from({ length: Number(mintedTotal.value) }, (it, i) => i + 1))
        } catch (err: any) {
            message.error(err.message || 'error')
        }
    }
}

const handMint = async () => {
    mintLoading.value = true
    try {
        await batchMint(mintParams.term, mintParams.count)
        await initData()
    } catch (err: any) {
        message.error(err.message || 'batchMint: error')
    }
    mintLoading.value = false
}

const handleSelect = (item: string) => {
    const index = selectedItems.value.findIndex(i => i == item)
    ~index ? selectedItems.value.splice(index, 1) : selectedItems.value.push(item)
}

const handleSelectAll = () => {
    if (selectedItems.value.length == mintedList.value.length) {
        selectedItems.value = []
        return
    }
    selectedItems.value = mintedList.value;
}

const handleClaim = async () => {
    await batchClaim([1])
}

const handleReuse = async () => {
    await batchReuseMint([1], 1)
}

const handleClaimAndMint = async () => {
    await batchClaimAndMint([1], 1)
}

const handleDestroy = () => {

}
</script>

<template>
    <div class="xen-manual-mint">
        <div class="mint-wrapper">
            <div class="mint-title">
                <NGradientText gradient="linear-gradient(90deg, red 0%, green 50%, blue 100%)">
                    Xen Batch Mint
                </NGradientText>
            </div>
            <div class="mint-refer">
                <NSpace>
                    <NTag type="info">Address: {{ userAddress }}</NTag>
                    <NTag type="primary">Balance: {{ mintRefer.globalRank }}</NTag>
                    <NTag type="warning">globalRank: {{ mintRefer.globalRank }}</NTag>
                    <NTag type="warning">AMP: {{ mintRefer.AMP }}</NTag>
                    <NTag type="warning">EAA: {{ mintRefer.EAA }}</NTag>
                </NSpace>
            </div>
            <div class="mint-params">
                <div class="mint-params_term params-item">
                    <NFormItem label="Term: " label-placement="left">
                        <NInputNumber v-model:value="mintParams.term" :min="1" :max="400" />
                    </NFormItem>
                </div>
                <div class="mint-params_count params-item">
                    <NFormItem label="Count: " label-placement="left">
                        <NInputNumber v-model:value="mintParams.count" :min="1" :max="130" />
                    </NFormItem>
                </div>
            </div>
            <div class="mint-button">
                <NButton type="primary" size="large" :loading="mintLoading" @click="handMint">Mint</NButton>
            </div>
        </div>
        <div class="minted-wrapper">
            <div class="minted-wrapper_header">
                <div class="minted-wrapper_header-item">
                    Total: {{ mintedTotal }}
                </div>
                <div class="minted-wrapper_header-item">
                    <NButton :disabled="mintedList.length == 0" @click="handleSelectAll">全选</NButton>
                </div>
                <div class="minted-wrapper_header-item">
                    <NButton :disabled="selectedItems.length == 0 || mintedList.length == 0" @click="handleClaim">提取</NButton>
                </div>
                <div class="minted-wrapper_header-item">
                    <NButton :disabled="selectedItems.length == 0 || mintedList.length == 0" @click="handleReuse">复用</NButton>
                </div>
                <div class="minted-wrapper_header-item">
                    <NButton :disabled="selectedItems.length == 0 || mintedList.length == 0" @click="handleClaimAndMint">提取并复用</NButton>
                </div>
                <div class="minted-wrapper_header-item">
                    <NButton :disabled="selectedItems.length == 0 || mintedList.length == 0" @click="handleDestroy">销毁/回收</NButton>
                </div>
            </div>
            <template v-if="mintedList.length">
                <div class="minted-list-wrapper">
                    <ul class="minted-list">
                        <li class="minted-list_item" :class="selectedItems.includes(item) ? 'item__selected' : null" v-for="(item, index) in mintedList" :key="index" @click="handleSelect(item)">
                            <MintedItem :id="index" :proxy="item" />
                        </li>
                    </ul>
                </div>
            </template>
            <template v-else>
                <NEmpty description="No Data">
                    <template #extra>
                        Maybe you should hava a Mint
                    </template>
                </NEmpty>
            </template>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.xen-manual-mint {
    width: 100%;
    height: 100%;
    user-select: none;

    .mint-wrapper {
        width: 100%;
        height: 42%;
        padding: 12px;
        border: 1px solid rgba(0, 0, 0, 0.1);
        box-shadow: $boxShadow1;
        border-radius: $borderRadius1;
        overflow: hidden;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .mint-title {
            text-align: center;
            font-size: 24px;
        }

        .mint-refer {
            margin-top: 12px;
        }

        .mint-params {
            margin-top: 12px;
            display: flex;
            justify-content: center;
            align-items: center;

            .params-item {
                margin-left: 24px;

                &:first-child {
                    margin-left: 0;
                }
            }
        }
    }

    .minted-wrapper {
        width: 100%;
        height: 45%;
        overflow: hidden;
        overflow-y: auto;
        margin-top: 5%;
        border: 1px solid rgba(0, 0, 0, 0.1);
        box-shadow: $boxShadow1;
        border-radius: $borderRadius1;

        .minted-wrapper_header {
            padding: 12px;
            display: flex;
            align-items: center;
            &-item {
                margin-left: 8px;
            }
        }

        .minted-list-wrapper {
            .minted-list {
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                padding: 0;

                .minted-list_item {
                    width: calc(20% - 12px);
                    padding: 8px 10px;
                    margin-top: 12px;
                    margin-left: 10px;
                    border: 1px solid rgba(0, 0, 0, 0.1);
                    box-shadow: $boxShadow1;
                    border-radius: $borderRadius1;
                    cursor: pointer;
                    overflow: hidden;
                    text-overflow: ellipsis;

                    &:hover {
                        border: 1px solid green;
                    }
                }
                .item__selected {
                    border: 1px solid green;
                }
            }
        }
    }
}
</style>
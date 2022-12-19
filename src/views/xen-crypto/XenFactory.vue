<script setup lang="ts">
import { reactive, ref, onMounted, watch, defineAsyncComponent } from 'vue'
import { useUserInfoStore } from '@/stores/app'
import { useXenFactoryStore } from '@/stores/xen-factory'
import {
    useMessage,
    NGradientText,
    NForm,
    NFormItem,
    NInputNumber,
    NButton,
    NEmpty,
    NTag,
    NGrid,
    NGridItem,
    NSpace
} from 'naive-ui'
import { getNetworkInfo } from '@/api/rpc/rpc'
import { getBalance } from '@/api/rpc/chain-node.rpc'
import {
    userMintIndex,
    batchMint,
    batchClaim,
    batchReuseMint,
    batchClaimAndMint,
} from '@/api/rpc/XENFactory.rpc'
import { getCurrentAMP, getCurrentMaxTerm, getCurrentEAAR, getGlobalRank } from '@/api/rpc/XENCrypto.rpc'

const MintedItem = defineAsyncComponent(() => import('@/components/MintedItem.vue'))

const userInfoStore = useUserInfoStore()
const xenFactoryStore = useXenFactoryStore()

const message = useMessage()

const userAddress = ref('--')

const mintDetails = reactive({
    address: '--',
    balance: '--',
    globalRank: '--',
    AMP: '--',
    EAA: '--',
    maxTerm: 200,
    maxCount: 130
})

const mintParams = reactive({
    count: 1,
    term: 1
})

const mintedTotal = ref('0')

interface MintedListItem {
    id: number;
}

const mintedList = ref<MintedListItem[]>([])

const mintLoading = ref(false)

const selectedItems = ref<number[]>([])

watch(userInfoStore.userInfo, async (val) => {
    if (val.address !== userAddress.value) {
        userAddress.value = val.address
    }
    await initData()
}, { deep: true })

onMounted(async () => {
    await initData()
})

const initData = async () => {
    userAddress.value = userInfoStore.userInfo.address
    if (userAddress.value == '--') return
    if (userAddress.value) {
        try {
            mintDetails.balance = await getBalance(userAddress.value)
            mintDetails.globalRank = await getGlobalRank()
            mintDetails.AMP = await getCurrentAMP()
            mintDetails.maxTerm = await getCurrentMaxTerm()
            mintDetails.EAA = await getCurrentEAAR()

            const networkInfo = getNetworkInfo()
            xenFactoryStore.setProxyMetaInfo({
                userAddress: userAddress.value,
                deployer: networkInfo.contracts.XENFactory,
                implementationAddress: networkInfo.contracts.XENProxyImplementation
            })

            mintedTotal.value = await userMintIndex(userAddress.value)
            mintedList.value = Array.from({ length: Number(mintedTotal.value) }, (item, index) => ({ id: index + 1 }))

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

const handleSelect = (item: number) => {
    const index = selectedItems.value.findIndex(i => i == item)
    ~index ? selectedItems.value.splice(index, 1) : selectedItems.value.push(item)
}

const handleSelectAll = () => {
    if (selectedItems.value.length == mintedList.value.length) {
        selectedItems.value = []
        return
    }
    selectedItems.value = mintedList.value.map(item => item.id);
}

const handleClaim = async () => {
    await batchClaim(selectedItems.value)
}

const handleReuse = async () => {
    await batchReuseMint(selectedItems.value, 1)
}

const handleClaimAndMint = async () => {
    await batchClaimAndMint(selectedItems.value, 1)
}

const handleDestroy = () => { }
</script>

<template>
    <div class="xen-manual-mint">
        <NGrid x-gap="24" y-gap="18" :cols="2">
            <NGridItem>
                <div class="grid-item_wrapper">
                    <NForm size="small" label-align="left" label-width="auto" label-placement="top">
                        <NFormItem label="Address:">
                            <NTag type="info">{{ userAddress }}</NTag>
                        </NFormItem>
                        <NFormItem label="Balance:">
                            <NTag type="primary">{{ mintDetails.balance }}</NTag>
                        </NFormItem>
                        <NFormItem label="GlobalRank:">
                            <NTag type="warning">{{ mintDetails.globalRank }}</NTag>
                        </NFormItem>
                        <NFormItem label="AMP:">
                            <NTag type="warning">{{ mintDetails.AMP }}</NTag>
                        </NFormItem>
                        <NFormItem label="EAA:">
                            <NTag type="warning">{{ mintDetails.EAA }}</NTag>
                        </NFormItem>
                    </NForm>
                </div>
            </NGridItem>
            <NGridItem>
                <div class="grid-item_wrapper">
                    <NForm size="small" label-align="left" label-width="auto" label-placement="top">
                        <div class="n-form__title">
                            <NGradientText gradient="linear-gradient(90deg, red 0%, green 50%, blue 100%)">
                                Xen Batch Mint
                            </NGradientText>
                        </div>
                        <NFormItem label="Term:">
                            <NInputNumber v-model:value="mintParams.term" :min="1" :max="mintDetails.maxTerm" />
                        </NFormItem>
                        <NFormItem label="Count:">
                            <NInputNumber v-model:value="mintParams.count" :min="1" :max="mintDetails.maxCount" />
                        </NFormItem>
                        <NFormItem label="Action:">
                            <NButton type="primary" size="large" :loading="mintLoading" @click="handMint">Mint</NButton>
                        </NFormItem>
                    </NForm>
                </div>
            </NGridItem>
        </NGrid>

        <div class="minted-summary-wrapper">
            <NSpace align="center">
                <NTag type="primary">Total: {{ mintedTotal }}</NTag>
                <NTag type="primary">Selected: {{ selectedItems.length }}</NTag>
                <NButton round :disabled="mintedList.length == 0" @click="handleSelectAll">全选</NButton>
                <NButton round :disabled="selectedItems.length == 0 || mintedList.length == 0" @click="handleClaim">提取
                </NButton>
                <NButton round :disabled="selectedItems.length == 0 || mintedList.length == 0" @click="handleReuse">复用
                </NButton>
                <NButton round :disabled="selectedItems.length == 0 || mintedList.length == 0"
                    @click="handleClaimAndMint">
                    提取并复用</NButton>
                <NButton round :disabled="true" @click="handleDestroy">销毁/回收</NButton>
            </NSpace>
        </div>
        <div class="minted-info-wrapper">
            <template v-if="mintedList.length">
                <div class="minted-list-wrapper">
                    <ul class="minted-list">
                        <li
                            class="minted-list_item"
                            :class="selectedItems.includes(item.id) ? 'item__selected' : null"
                            v-for="item in mintedList"
                            :key="item.id"
                            @click="handleSelect(item.id)"
                        >
                            <MintedItem :id="item.id"/>
                        </li>
                    </ul>
                </div>
            </template>
            <template v-else>
                <NEmpty description="No Data" />
            </template>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.xen-manual-mint {
    width: 100%;
    height: 100%;

    .grid-item_wrapper {
        height: 100%;
        padding: 18px 24px;
        border: 1px solid rgba(0, 0, 0, 0.1);
        box-shadow: $boxShadow1;
        border-radius: $borderRadius1;
        display: flex;
        align-items: center;
        justify-content: center;

        .n-form__title {
            width: 100%;
            text-align: center;
            margin-bottom: 24px;
            font-size: 24px;
        }
        .n-form-item {
            margin-top: 0px;
        }
    }

    .minted-summary-wrapper {
        width: 100%;
        padding: 12px;
        margin-top: 24px;
        border: 1px solid rgba(0, 0, 0, 0.1);
        box-shadow: $boxShadow1;
        border-radius: $borderRadius1;
    }

    .minted-info-wrapper {
        width: 100%;
        height: 50vh;
        overflow: hidden;
        overflow-y: auto;
        margin-top: 12px;
        border: 1px solid rgba(0, 0, 0, 0.1);
        box-shadow: $boxShadow1;
        border-radius: $borderRadius1;
        display: flex;
        align-items: center;
        justify-content: center;

        .minted-list-wrapper {
            width: 100%;
            height: 100%;

            .minted-list {
                width: 100%;
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
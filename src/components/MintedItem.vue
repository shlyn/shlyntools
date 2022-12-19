<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { getUserMintsByIndex } from '@/api/rpc/XENCrypto.rpc'
import { getCreate2ContractAddress } from '@/utils/contract.util'
import { NEllipsis, useMessage, NFormItem } from 'naive-ui'
import { useXenFactoryStore } from '@/stores/xen-factory'
import { dateFormatter } from '@/utils/date.util'

interface Props {
    id: number;
}

interface MintedInfo {
    user: string;
    rank: number;
    term: number;
    maturityTs: number;
    amplifier: string;
    eaaRate: string;
}

const xenFactoryStore = useXenFactoryStore()
const message = useMessage()
const ellipsisStyle = { maxWidth: '150px' }

const props = defineProps<Props>()

const proxy = ref('')

const mintedInfo = ref<MintedInfo>({
    user: '',
    rank: 0,
    term: 0,
    maturityTs: 0,
    amplifier: '',
    eaaRate: ''
})

onMounted(async () => {
    await init()
})

const init = async () => {
    try {
        proxy.value = getCreate2ContractAddress(
            xenFactoryStore.proxyMetaInfo.deployer,
            xenFactoryStore.proxyMetaInfo.implementationAddress,
            xenFactoryStore.proxyMetaInfo.userAddress,
            props.id
        )
        mintedInfo.value = await getUserMintsByIndex(proxy.value)
    } catch (err: any) {
        message.error(err.message || 'Failed to get mint-info')
    }
}
</script>
<template>
    <div class="minted-item">
        <NFormItem size="small" label="ID" label-placement="left">
            {{ id }}
        </NFormItem>
        <NFormItem size="small" label="Proxy" label-placement="left">
            <NEllipsis :style="ellipsisStyle">
                {{ proxy }}
            </NEllipsis>
        </NFormItem>
        <NFormItem size="small" label="Rank" label-placement="left">
            {{ mintedInfo.rank }}
        </NFormItem>
        <NFormItem size="small" label="Term" label-placement="left">
            {{ mintedInfo.term }}
        </NFormItem>
        <NFormItem size="small" label="maturityTs" label-placement="left">
            {{ dateFormatter(mintedInfo.maturityTs * 1000) }}
        </NFormItem>
    </div>
</template>

<style lang="scss" scoped>
.minted-item {
    width: 100%;
    height: 100%;

    .n-form-item {
        height: 32px;
    }
}
</style>

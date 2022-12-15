<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { getUserMints } from '@/api/rpc/XENCrypto.rpc'
import { NEllipsis, useMessage } from 'naive-ui'

interface Props {
    id: number;
    proxy: string;
}

interface MintedInfo {
    user: string;
    rank: string;
    term: string;
    maturityTs: string;
    amplifier: string;
    eaaRate: string;
}

const message = useMessage()
const ellipsisStyle = { maxWidth: '150px' }
const props = defineProps<Props>()

const mintedInfo = ref<MintedInfo>({
    user: '',
    rank: '',
    term: '',
    maturityTs: '',
    amplifier: '',
    eaaRate: ''
})

onMounted(async () => {
    await init()
})

const init = async () => {
    try {
        mintedInfo.value = await getUserMints(props.proxy)
    }catch(err: any) {
        message.error(err.message || 'Failed to get mint-info')
    }
}
</script>
<template>
    <div>
        <div class="item-row">
            Id:&nbsp;
            <NEllipsis :style="ellipsisStyle">
                {{ id + 1 }}
            </NEllipsis>
        </div>
        <div class="item-row">
            Address:&nbsp;
            <NEllipsis :style="ellipsisStyle">
                {{ proxy }}
            </NEllipsis>
        </div>
        <div class="item-row">
            Rank:&nbsp;
            <NEllipsis :style="ellipsisStyle">
                {{ mintedInfo.rank }}
            </NEllipsis>
        </div>
    </div>
</template>

<style lang="scss">

</style>
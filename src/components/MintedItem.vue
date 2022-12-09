<script lang="ts" setup>
import { onMounted } from 'vue'
import { getUserMints } from '@/api/rpc/XENCrypto.rpc'
import { NEllipsis } from 'naive-ui'

interface Props {
    id: number;
    proxy: string;
}

interface MintedInfo {
    index: number,
    address: string,
    unlockTime: string,
    reward: string,
    rank: number
}

const ellipsisStyle = { maxWidth: '150px' }
const props = defineProps<Props>()

onMounted(async () => {
    await init()
})

const init = async () => {
    const info = await getUserMints(props.proxy)
    console.log(info)
}
</script>
<template>
    <div>
        <div class="item-row">
            ID:&nbsp;
            <NEllipsis :style="ellipsisStyle">
                {{ 'item.index' }}
            </NEllipsis>
        </div>
    </div>
</template>

<style lang="scss">

</style>
<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue'
import { NGrid, NGridItem, NInput, NInputNumber, NButton } from 'naive-ui'
import { getCreateContractAddress } from '@/utils/contract.util'
import { ConnectInfoStored } from '@/utils/storage.util'

const addressProps = reactive({
    address: '',
    nonce: 0,
    contractAddress: '' 
})

const cointoolMint = reactive({
    total: 1,
    data: '',
    salt: ''
})

onMounted(async () => {
    addressProps.address = ConnectInfoStored.value.address || ''
})

const handleCalcContractAddress = () => {
    addressProps.contractAddress = getCreateContractAddress(addressProps.address.toLowerCase(), addressProps.nonce)
}
</script>
<template>
    <div class="contract-tool-wrapper">
        <NGrid x-gap="12" y-gap="8" :cols="4">
            <NGridItem>
                <div class="wrapper">
                    <div class="row-item title uppercase">calculate contract create address</div>
                    <div class="row-item">
                        <NInput v-model:value="addressProps.address" />
                    </div>
                    <div class="row-item">
                        <NInputNumber v-model:value="addressProps.nonce" />
                    </div>
                    <div class="row-item">
                        <NButton @click="handleCalcContractAddress">calc address</NButton>
                    </div>
                    <div class="row-item">
                        Result: {{ addressProps.contractAddress }}
                    </div>
                </div>
            </NGridItem>
        </NGrid>
    </div>
</template>

<style lang="scss" scoped>
.contract-tool-wrapper {
    box-sizing: border-box;
    .wrapper {
        padding: 8px;
        border: 1px solid rgba(0,0,0,0.1);
        box-shadow: $boxShadow1;
        .row-item {
            margin-top: 12px;
            text-align: center;
        }
    }
}
</style>
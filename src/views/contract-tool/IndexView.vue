<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { NGrid, NGridItem, NForm, NFormItem, NInput, NInputNumber, NButton } from 'naive-ui'
import { getCreateContractAddress, getCreate2ContractAddress } from '@/utils/contract.util'
import { ConnectInfoStored } from '@/utils/storage.util'
import { getNonce } from '@/api/rpc/chain-node.rpc'

// default deploye contract address 
const createProps = reactive({
    address: '',
    nonce: 1,
    contractAddress: ''
})

const create2Props = reactive({
    deployer: '',
    bytecodeAddress: '',
    userAddress: '',
    index: 1,
    contractAddress: ''
})

// const cointoolMint = reactive({
//     total: 1,
//     data: '',
//     salt: ''
// })

onMounted(async () => {
    createProps.address = ConnectInfoStored.value.address || ''
    createProps.nonce = await getNonce(createProps.address) || 1
})

const handleCalcContractAddress = (type: 1 | 2) => {
    if (type == 1) {
        createProps.contractAddress = getCreateContractAddress(createProps.address.toLowerCase(), createProps.nonce)
    } else {
        create2Props.contractAddress = getCreate2ContractAddress(
            create2Props.deployer,
            create2Props.bytecodeAddress,
            create2Props.userAddress,
            create2Props.index
        )
    }
}
</script>
<template>
    <div class="contract-tool-wrapper">
        <NGrid x-gap="12" y-gap="8" :cols="4">
            <NGridItem>
                <div class="wrapper">
                    <div class="row-item title uppercase">Calculate Create-Address</div>
                    <NForm label-align="right" label-width="auto" label-placement="left">
                        <NFormItem label="Deployer">
                            <NInput v-model:value="createProps.address" />
                        </NFormItem>
                        <NFormItem label="Nonce">
                            <NInputNumber v-model:value="createProps.nonce" />
                        </NFormItem>
                        <NFormItem label="Action">
                            <NButton @click="handleCalcContractAddress(1)">Calculate</NButton>
                        </NFormItem>
                    </NForm>
                    <div class="row-item">
                        {{ createProps.contractAddress }}
                    </div>
                </div>
            </NGridItem>
            <NGridItem>
                <div class="wrapper">
                    <div class="row-item title uppercase">Calculate Create2-Address</div>
                    <NForm label-align="right" label-width="auto" label-placement="left">
                        <NFormItem label="deployer">
                            <NInput v-model:value="create2Props.deployer" />
                        </NFormItem>
                        <NFormItem label="bytecodeAddress">
                            <NInput v-model:value="create2Props.bytecodeAddress" />
                        </NFormItem>
                        <NFormItem label="userAddress">
                            <NInput v-model:value="create2Props.userAddress" />
                        </NFormItem>
                        <NFormItem label="index">
                            <NInputNumber v-model:value="create2Props.index" />
                        </NFormItem>
                        <NFormItem label="Action">
                            <NButton @click="handleCalcContractAddress(2)">Calculate</NButton>
                        </NFormItem>
                    </NForm>
                    <div class="row-item">
                        {{ create2Props.contractAddress }}
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
        height: 100%;
        padding: 8px;
        border: 1px solid rgba(0, 0, 0, 0.1);
        box-shadow: $boxShadow1;
        text-align: center;
        .n-form-item {
            margin-top: 8px;
        }

        .row-item {
            margin-top: 12px;
        }
    }
}
</style>
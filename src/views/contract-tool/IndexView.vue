<script setup lang="ts">
import { onMounted, reactive, watch } from 'vue'
import { useUserInfoStore } from '@/stores/app'
import { NGrid, NGridItem, NForm, NFormItem, NInput, NInputNumber, NButton } from 'naive-ui'
import { getCreateContractAddress, getCreate2ContractAddress } from '@/utils/contract.util'
import { getNonce } from '@/api/rpc/chain-node.rpc'
import { getOwner, getProxyImplementation, getBytecodeHash, setFactory } from '@/api/rpc/XENFactory.rpc'
import { getFactory, getXenCrypto } from '@/api/rpc/XENProxyImplementaion.rpc'

const userInfoStore = useUserInfoStore()

// default deploye contract address 
const createProps = reactive({
    address: '',
    nonce: -1,
    contractAddress: ''
})

const create2Props = reactive({
    deployer: import.meta.env.VITE_ADDRESS_XEN_FACTORY,
    bytecodeAddress: '',
    userAddress: '',
    index: 1,
    contractAddress: ''
})

const xenProxyImplementaion = reactive({
    self: import.meta.env.VITE_ADDRESS_XEN_PROXY_IMPLEMENTAION,
    xenCrypto: '',
    factory: ''
})

const xenFactory = reactive({
    self: import.meta.env.VITE_ADDRESS_XEN_FACTORY,
    xenProxy: '',
    owner: '',
    bytecodeHash: ''
})

watch(() => userInfoStore.userInfo.address, async() => {
    createProps.address = userInfoStore.userInfo.address
    createProps.nonce = await getNonce(createProps.address) || 1
})

onMounted(async () => {
    createProps.address = userInfoStore.userInfo.address
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

const handleXENFactoryInfo = async () => {
    xenFactory.owner = await getOwner()
    xenFactory.xenProxy = await getProxyImplementation()
    xenFactory.bytecodeHash = await getBytecodeHash()
}

const handleSetFactory = async () => {
    const template = import.meta.env.VITE_ADDRESS_XEN_PROXY_IMPLEMENTAION
    await setFactory(template)
}

const handleXenProxyImplementaion = async () => {
    xenProxyImplementaion.xenCrypto = await getXenCrypto()
    xenProxyImplementaion.factory = await getFactory()
}
</script>
<template>
    <div class="contract-tool-wrapper">
        <NGrid x-gap="16" y-gap="16" :cols="3">
            <NGridItem>
                <div class="wrapper">
                    <div class="row-item title">Calculate Create-Address</div>
                    <NForm label-align="right" label-width="auto" label-placement="left">
                        <NFormItem label="Deployer">
                            <NInput v-model:value="createProps.address" />
                        </NFormItem>
                        <NFormItem label="Nonce">
                            <NInputNumber v-model:value="createProps.nonce" />
                        </NFormItem>
                        <NFormItem label="Result">
                            {{ createProps.contractAddress }}
                        </NFormItem>
                        <NFormItem label="Action">
                            <NButton @click="handleCalcContractAddress(1)">Calculate</NButton>
                        </NFormItem>
                    </NForm>
                </div>
            </NGridItem>
            <NGridItem>
                <div class="wrapper">
                    <div class="row-item title">Calculate Create2-Address</div>
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
                        <NFormItem label="id">
                            <NInputNumber v-model:value="create2Props.index" />
                        </NFormItem>
                        <NFormItem label="Result">
                            {{ create2Props.contractAddress }}
                        </NFormItem>
                        <NFormItem label="Action">
                            <NButton @click="handleCalcContractAddress(2)">Calculate</NButton>
                        </NFormItem>
                    </NForm>
                </div>
            </NGridItem>
            <NGridItem>
                <div class="wrapper">
                    <div class="row-item title">XENProxyImplementaion Contract Info</div>
                    <NForm label-align="right" label-width="auto" label-placement="left">
                        <NFormItem label="Self">
                            {{ xenProxyImplementaion.self }}
                        </NFormItem>
                        <NFormItem label="XENCrypto">
                            <NInput v-model:value="xenProxyImplementaion.xenCrypto" placeholder="Click Query"/>
                        </NFormItem>
                        <NFormItem label="XENFactory">
                            <NInput v-model:value="xenProxyImplementaion.factory" placeholder="Click Query"/>
                        </NFormItem>
                        <NFormItem label="Action">
                            <NButton @click="handleXenProxyImplementaion">Query</NButton>
                        </NFormItem>
                    </NForm>
                </div>
            </NGridItem>
            <NGridItem>
                <div class="wrapper">
                    <div class="row-item title">XENFactory Info</div>
                    <NForm label-align="right" label-width="auto" label-placement="left">
                        <NFormItem label="Self">
                            {{ xenFactory.self }}
                        </NFormItem>
                        <NFormItem label="owner">
                            <NInput v-model:value="xenFactory.owner" placeholder="Click Query"/>
                        </NFormItem>
                        <NFormItem label="xenProxy">
                            <NInput v-model:value="xenFactory.xenProxy" placeholder="Click Query"/>
                        </NFormItem>
                        <NFormItem label="bytecodeHash">
                            <NInput v-model:value="xenFactory.bytecodeHash" placeholder="Click Query"/>
                        </NFormItem>
                        <NFormItem label="Action1">
                            <NButton @click="handleSetFactory">Initialize</NButton>
                        </NFormItem>
                        <NFormItem label="Action2">
                            <NButton @click="handleXENFactoryInfo">Query</NButton>
                        </NFormItem>
                    </NForm>
                </div>
            </NGridItem>
        </NGrid>
    </div>
</template>

<style lang="scss" scoped>
.contract-tool-wrapper {
    height: 100%;
    box-sizing: border-box;

    .wrapper {
        height: 100%;
        padding: 24px;
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
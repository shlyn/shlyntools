<script setup lang="ts">
import { onMounted, reactive, watch } from 'vue'
import { useUserInfoStore } from '@/stores/app'
import { NGrid, NGridItem, NForm, NFormItem, NInput, NInputNumber, NButton } from 'naive-ui'
import { getCreateContractAddress, getCreate2ContractAddress, getMethodId } from '@/utils/contract.util'
import { getNonce } from '@/api/rpc/chain-node.rpc'
import { getOwner, getProxyImplementation, getBytecodeHash, setProxyImplementation } from '@/api/rpc/XENFactory.rpc'
import { getFactory, getXenCrypto } from '@/api/rpc/XENProxyImplementaion.rpc'
import { getNetworkInfo } from '@/api/rpc/rpc'

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

const methodInfo = reactive({
    signature: '',
    id: '0x'
})

watch(() => userInfoStore.userInfo.address, async() => {
    await initCreateProps()
})

onMounted(async () => {
    await initCreateProps()
})

const initCreateProps = async () => {
    createProps.address = userInfoStore.userInfo.address
    if (createProps.address) {
        createProps.nonce = await getNonce(createProps.address)
    }
}

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
    const info = getNetworkInfo()
    xenFactory.self = info.contracts.XENFactory

    xenFactory.owner = await getOwner()
    xenFactory.xenProxy = await getProxyImplementation()
    xenFactory.bytecodeHash = await getBytecodeHash()
}

const handleSetFactory = async () => {
    const info = getNetworkInfo()
    if (info.contracts.XENProxyImplementation) {
        await setProxyImplementation(info.contracts.XENProxyImplementation)
    }
}

const handleXenProxyImplementaion = async () => {
    const info = getNetworkInfo()
    xenProxyImplementaion.self = info.contracts.XENProxyImplementation

    xenProxyImplementaion.xenCrypto = await getXenCrypto()
    xenProxyImplementaion.factory = await getFactory()
}

const handleMethodId = () => {
    methodInfo.id = getMethodId(methodInfo.signature)
}
</script>
<template>
    <div class="contract-tool-wrapper">
        <NGrid x-gap="16" y-gap="16" :cols="3">
            <NGridItem>
                <div class="wrapper">
                    <div class="row-item title">Calculate Create-Address</div>
                    <NForm size="small" label-align="left" label-width="auto" label-placement="top">
                        <NFormItem label="Deployer:">
                            <NInput v-model:value="createProps.address" />
                        </NFormItem>
                        <NFormItem label="Nonce:">
                            <NInputNumber v-model:value="createProps.nonce" />
                        </NFormItem>
                        <NFormItem label="Result:">
                            {{ createProps.contractAddress }}
                        </NFormItem>
                        <NFormItem label="Action:">
                            <NButton @click="handleCalcContractAddress(1)">Calculate</NButton>
                        </NFormItem>
                    </NForm>
                </div>
            </NGridItem>
            <NGridItem>
                <div class="wrapper">
                    <div class="row-item title">Calculate Create2-Address</div>
                    <NForm size="small" label-align="left" label-width="auto" label-placement="top">
                        <NFormItem label="deployer:">
                            <NInput v-model:value="create2Props.deployer" />
                        </NFormItem>
                        <NFormItem label="bytecodeAddress:">
                            <NInput v-model:value="create2Props.bytecodeAddress" />
                        </NFormItem>
                        <NFormItem label="userAddress:">
                            <NInput v-model:value="create2Props.userAddress" />
                        </NFormItem>
                        <NFormItem label="id:">
                            <NInputNumber v-model:value="create2Props.index" />
                        </NFormItem>
                        <NFormItem label="Result:">
                            {{ create2Props.contractAddress }}
                        </NFormItem>
                        <NFormItem label="Action:">
                            <NButton @click="handleCalcContractAddress(2)">Calculate</NButton>
                        </NFormItem>
                    </NForm>
                </div>
            </NGridItem>
            <NGridItem>
                <div class="wrapper">
                    <div class="row-item title">XENProxyImplementaion Contract Info</div>
                    <NForm size="small" label-align="left" label-width="auto" label-placement="top">
                        <NFormItem label="Self:">
                            {{ xenProxyImplementaion.self }}
                        </NFormItem>
                        <NFormItem label="XENCrypto:">
                            <NInput v-model:value="xenProxyImplementaion.xenCrypto" placeholder="Click Query"/>
                        </NFormItem>
                        <NFormItem label="XENFactory:">
                            <NInput v-model:value="xenProxyImplementaion.factory" placeholder="Click Query"/>
                        </NFormItem>
                        <NFormItem label="Action:">
                            <NButton @click="handleXenProxyImplementaion">Query</NButton>
                        </NFormItem>
                    </NForm>
                </div>
            </NGridItem>
            <NGridItem>
                <div class="wrapper">
                    <div class="row-item title">XENFactory Info</div>
                    <NForm size="small" label-align="left" label-width="auto" label-placement="top">
                        <NFormItem label="Self:">
                            {{ xenFactory.self }}
                        </NFormItem>
                        <NFormItem label="owner:">
                            <NInput v-model:value="xenFactory.owner" placeholder="Click Query"/>
                        </NFormItem>
                        <NFormItem label="xenProxy:">
                            <NInput v-model:value="xenFactory.xenProxy" placeholder="Click Query"/>
                        </NFormItem>
                        <NFormItem label="bytecodeHash:">
                            <NInput v-model:value="xenFactory.bytecodeHash" placeholder="Click Query"/>
                        </NFormItem>
                        <NFormItem label="Action1:">
                            <NButton @click="handleSetFactory">Initialize</NButton>
                        </NFormItem>
                        <NFormItem label="Action2:">
                            <NButton @click="handleXENFactoryInfo">Query</NButton>
                        </NFormItem>
                    </NForm>
                </div>
            </NGridItem>
            <NGridItem>
                <div class="wrapper">
                    <div class="row-item title">Method id</div>
                    <NForm size="small" label-align="left" label-width="auto" label-placement="top">
                        <NFormItem label="e.g: batchMint(uint256 startTokenId,uint256 endTokenId)">
                            <NInput v-model:value="methodInfo.signature" placeholder="input"/>
                        </NFormItem>
                        <NFormItem label="Result:">
                            {{ methodInfo.id }}
                        </NFormItem>
                        <NFormItem label="Action:">
                            <NButton @click="handleMethodId">Calculate</NButton>
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
            margin-top: 0px;
        }

        .row-item {
            margin-top: 12px;
        }
    }
}
</style>
import { ref } from 'vue'
import { defineStore } from 'pinia'

interface ProxyMetaInfo {
    deployer: string;
    implementationAddress: string;
    userAddress: string;
}

interface MintedInfoItem {
    id: number;
    proxyAddress: string;
}

export const useXenFactoryStore = defineStore('xenFactory', () => {
    const proxyMetaInfo = ref<ProxyMetaInfo>({
        deployer: '',
        implementationAddress: '',
        userAddress: ''
    })

    const mintedInfoList = ref<MintedInfoItem[]>([])

    const setProxyMetaInfo = (info: ProxyMetaInfo) => {
        proxyMetaInfo.value = info
    }

    const mintedInfoListAddItem = (mintedInfo: MintedInfoItem) => {
        const index = mintedInfoList.value.findIndex(item => item.id === mintedInfo.id)
        ~index ? mintedInfoList.value.splice(index, 1) : mintedInfoList.value.push(mintedInfo)
    }

    const mintedInfoListClear = () => {
        mintedInfoList.value = []
    }

    return {
        proxyMetaInfo,
        setProxyMetaInfo,
        mintedInfoList,
        mintedInfoListAddItem,
        mintedInfoListClear
    }
})

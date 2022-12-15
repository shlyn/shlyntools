import { getNetworkConfig } from '@/config/chain.config'
import { useUserInfoStore } from '@/stores/app'

export const getNetworkInfo  = () => {
    const userInfoStore = useUserInfoStore()
    const chainId = userInfoStore.userInfo.chainId
    const network = getNetworkConfig(chainId)

    let rpcUrl = ''
    if (network?.Infura && import.meta.env.VITE_INFURA_OR_ALCHEMY == 1) {
        rpcUrl = `${network.Infura}${import.meta.env.VITE_API_KEY_INFURA}`
    } else if (network?.Alchemy && import.meta.env.VITE_INFURA_OR_ALCHEMY == 2) {
        rpcUrl = `${network.Alchemy}${import.meta.env.VITE_API_KEY_ALCHEMY}`
    } else {
        rpcUrl = network.rpcUrl
    }
    network.rpcUrl = rpcUrl
    return network
}
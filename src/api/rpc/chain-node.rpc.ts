
import { providers, utils } from 'ethers'
// import { getWalletProvider } from '@/utils/wallet-connect.util'

const infura = `${import.meta.env.VITE_URL_INFURA}/${import.meta.env.VITE_API_KEY_INFURA}`

export const getBalance = async (address: string) => {
    const jsonRPCProvider = new providers.JsonRpcProvider(infura)
    const balance = await jsonRPCProvider.getBalance(address)
    return utils.formatEther(balance)
}

export const getNonce = async (address: string) => {
    const jsonRPCProvider = new providers.JsonRpcProvider(infura)
    const nonce = await jsonRPCProvider.getTransactionCount(address)
    return nonce
}
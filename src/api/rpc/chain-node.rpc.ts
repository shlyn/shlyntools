import { providers, utils } from 'ethers'
import { getWalletProvider } from '@/utils/wallet-connect.util'

export const getBalance = async (address: string) => {
    const rpcProvider = new providers.Web3Provider(getWalletProvider())
    const balance = await rpcProvider.getBalance(address)
    return utils.formatEther(balance)
}

export const getNonce = async (address: string) => {
    const rpcProvider = new providers.Web3Provider(getWalletProvider())
    return await rpcProvider.getTransactionCount(address)
}
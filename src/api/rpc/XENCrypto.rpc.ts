import { Contract, providers } from 'ethers'
// import { getWalletProvider } from '@/utils/wallet-connect.util'
import * as artifact from './abis/XENCrypto.json'

const infura = `${import.meta.env.VITE_URL_INFURA}/${import.meta.env.VITE_API_KEY_INFURA}`
const contractAddress = import.meta.env.VITE_ADDRESS_XEN

export const getActiveMinters = async() => {
    const jsonRPCProvider = new providers.JsonRpcProvider(infura)
    const contract = new Contract(contractAddress, artifact.abi, jsonRPCProvider)
    const amount = await contract.activeMinters()
    return amount.toString()
}

export const getCurrentMaxTerm = async() => {
    const jsonRPCProvider = new providers.JsonRpcProvider(infura)
    const contract = new Contract(contractAddress, artifact.abi, jsonRPCProvider)
    const amount = await contract.getCurrentMaxTerm()
    return amount.toString()
}

export const balanceOf = async(address: string) => {
    const jsonRPCProvider = new providers.JsonRpcProvider(infura)
    const contract = new Contract(contractAddress, artifact.abi, jsonRPCProvider)
    return await contract.balanceOf(address)
}

/**
 * @param address 
 * @returns {
 *  user: string;
 *  term: BigNumber,
 *  maturityTs: BigNumber,
 *  rank: BigNumber,
 *  amplifier: BigNumber,
 *  eaaRate: BigNumber
 * }
 */
export const getUserMints = async(address: string) => {
    const jsonRPCProvider = new providers.JsonRpcProvider(infura)
    const contract = new Contract(contractAddress, artifact.abi, jsonRPCProvider)
    const minted = await contract.userMints(address)
    return {
        user: minted.user,
        term: minted.term.toString(),
        maturityTs: minted.maturityTs.toString(),
        rank: minted.rank.toString(),
        amplifier: minted.amplifier.toString(),
        eaaRate: minted.eaaRate.toString()
    }
}

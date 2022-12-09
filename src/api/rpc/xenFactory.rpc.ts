import { Contract, providers } from 'ethers'
import { getWalletProvider } from '@/utils/wallet-connect.util'
import * as artifact from './abis/XenFactory.json'

const infura = `${import.meta.env.VITE_URL_INFURA}/${import.meta.env.VITE_API_KEY_INFURA}`
const contractAddress = import.meta.env.VITE_ADDRESS_XEN_FACTORY

export const getMiniProxy = async() => {
    const jsonRPCProvider = new providers.JsonRpcProvider(infura)
    const contract = new Contract(contractAddress, artifact.abi, jsonRPCProvider)
    return await contract.MINI_PROXY()
}

export const userMintIndex = async(address: string) => {
    const jsonRPCProvider = new providers.JsonRpcProvider(infura)
    const contract = new Contract(contractAddress, artifact.abi, jsonRPCProvider)
    const amount = await contract.userMintIndex(address)
    return amount.toString()
}

// multiMint
export const multiMint = async(term: number, count: number) => {
    const provider = new providers.Web3Provider(getWalletProvider())
    const signer = await provider.getSigner()
    const contract = new Contract(contractAddress, artifact.abi, provider)
    const receipt = await contract.connect(signer).multiMint(term, count)
    return receipt.wait()
}

export const multiReuseMint = async (ids: number[], term: number) => {

}

export const multiClaim = async (ids: number[]) => {

}
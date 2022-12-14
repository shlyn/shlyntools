import { Contract, ethers, providers } from 'ethers'
import { getWalletProvider } from '@/utils/wallet-connect.util'
import * as artifact from './abis/XENFactory.json'

const infura = `${import.meta.env.VITE_URL_INFURA}/${import.meta.env.VITE_API_KEY_INFURA}`
const contractAddress = import.meta.env.VITE_ADDRESS_XEN_FACTORY
const gaslimitRatio = Number(import.meta.env.VITE_GASLIMIT_RATIO)

export const getOwner = async () => {
    const jsonRPCProvider = new providers.JsonRpcProvider(infura)
    const contract = new Contract(contractAddress, artifact.abi, jsonRPCProvider)
    return await contract.owner()
}

export const getProxyImplementation = async () => {
    const jsonRPCProvider = new providers.JsonRpcProvider(infura)
    const contract = new Contract(contractAddress, artifact.abi, jsonRPCProvider)
    return await contract.proxyImplementation()
}

export const getBytecodeHash = async () => {
    const jsonRPCProvider = new providers.JsonRpcProvider(infura)
    const contract = new Contract(contractAddress, artifact.abi, jsonRPCProvider)
    return await contract.bytecodeHash()
}

export const userMintIndex = async(address: string) => {
    const jsonRPCProvider = new providers.JsonRpcProvider(infura)
    const contract = new Contract(contractAddress, artifact.abi, jsonRPCProvider)
    const amount = await contract.userMintIndex(address)
    return amount.toString()
}

export const setFactory = async (xenProxy: string) => {
    const provider = new providers.Web3Provider(getWalletProvider())
    const signer = await provider.getSigner()
    const contract = new Contract(contractAddress, artifact.abi, provider)
    const tx = await contract.connect(signer).setFactory(xenProxy)
    return tx.wait()
}

export const transferOwnership = async (newOwner: string) => {
    const provider = new providers.Web3Provider(getWalletProvider())
    const signer = await provider.getSigner()
    const contract = new Contract(contractAddress, artifact.abi, provider)
    const tx = await contract.connect(signer).transferOwnership(newOwner)
    return tx.wait()
}

// Mint
export const batchMint = async(term: number, count: number) => {
    const provider = new providers.Web3Provider(getWalletProvider())
    const signer = await provider.getSigner()
    const contract = new Contract(contractAddress, artifact.abi, provider)
    const gasLimit = await contract.connect(signer).estimateGas.batchMint(term, count)
    const tx = await contract.connect(signer).batchMint(term, count, {
        gasLimit: Math.ceil(gasLimit.toNumber() * gaslimitRatio)
    })
    return tx.wait()
}

export const batchClaim = async(ids: number[]) => {
    const provider = new providers.Web3Provider(getWalletProvider())
    const signer = await provider.getSigner()
    const contract = new Contract(contractAddress, artifact.abi, provider)
    const tx = await contract.connect(signer).batchClaim(ids)
    return tx.wait()
}

export const batchReuseMint = async(ids: number[], term: number) => {
    const provider = new providers.Web3Provider(getWalletProvider())
    const signer = await provider.getSigner()
    const contract = new Contract(contractAddress, artifact.abi, provider)
    const receipt = await contract.connect(signer).batchReuseMint(ids, term)
    return receipt.wait()
}

export const batchClaimAndMint = async(ids: number[], term: number) => {
    const provider = new providers.Web3Provider(getWalletProvider())
    const signer = await provider.getSigner()
    const contract = new Contract(contractAddress, artifact.abi, provider)
    const tx = await contract.connect(signer).batchClaimAndMint(ids, term)
    return tx.wait()
}

export const callKill = async(ids: number[]) => {
    const provider = new providers.Web3Provider(getWalletProvider())
    const signer = await provider.getSigner()
    const contract = new Contract(contractAddress, artifact.abi, provider)
    const tx = await contract.connect(signer).callKill(ids)
    return tx.wait()
}

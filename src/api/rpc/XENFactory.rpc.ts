import { Contract, providers } from 'ethers'
import { getWalletProvider } from '@/utils/wallet-connect.util'
import * as artifact from './abis/XENFactoryUpgradeable.json'
import { getNetworkInfo } from './rpc'

const getReadContract = () => {
    const networkInfo = getNetworkInfo()
    const jsonRPCProvider = new providers.JsonRpcProvider(networkInfo.rpcUrl)
    return new Contract(networkInfo.contracts.XENFactory, artifact.abi, jsonRPCProvider)
}

const getWriteContract = () => {
    const networkInfo = getNetworkInfo()
    const provider = new providers.Web3Provider(getWalletProvider())
    const contract = new Contract(networkInfo.contracts.XENFactory, artifact.abi, provider)

    return {
        provider,
        contract
    }
}

const gaslimitRatio = Number(import.meta.env.VITE_GASLIMIT_RATIO)

export const getOwner = async () => {
    const contract = getReadContract()
    return await contract.owner()
}

export const getProxyImplementation = async () => {
    const contract = getReadContract()
    return await contract.proxyImplementation()
}

export const getBytecodeHash = async () => {
    const contract = getReadContract()
    return await contract.bytecodeHash()
}

export const userMintIndex = async (address: string) => {
    const contract = getReadContract()
    const amount = await contract.userMintIndex(address)
    return amount.toString()
}

export const setProxyImplementation = async (xenProxy: string) => {
    const { provider, contract } = getWriteContract()
    const signer = await provider.getSigner()
    const tx = await contract.connect(signer).setProxyImplementation(xenProxy)
    return tx.wait()
}

export const transferOwnership = async (newOwner: string) => {
    const { provider, contract } = getWriteContract()
    const signer = await provider.getSigner()
    const tx = await contract.connect(signer).transferOwnership(newOwner)
    return tx.wait()
}

///////////////////////////////////////////////////////

export const batchMint = async (term: number, count: number) => {
    const { provider, contract } = getWriteContract()
    const signer = await provider.getSigner()
    const gasLimit = await contract.connect(signer).estimateGas.estimateBatchMint(term, count)
    const tx = await contract.connect(signer).batchMint(term, count, {
        gasLimit: Math.ceil(gasLimit.toNumber() * gaslimitRatio)
    })
    return tx.wait()
}

export const batchClaim = async (ids: number[]) => {
    const { provider, contract } = getWriteContract()
    const signer = await provider.getSigner()
    const gasLimit = await contract.connect(signer).estimateGas.estimateBatchClaim(ids)
    const tx = await contract.connect(signer).batchClaim(ids, {
        gasLimit: Math.ceil(gasLimit.toNumber() * gaslimitRatio)
    })
    return tx.wait()
}

export const batchReuseMint = async (ids: number[], term: number) => {
    const { provider, contract } = getWriteContract()
    const signer = await provider.getSigner()
    const gasLimit = await contract.connect(signer).estimateGas.estimateBatchReuseMint(ids, term)
    const tx = await contract.connect(signer).batchReuseMint(ids, term, {
        gasLimit: Math.ceil(gasLimit.toNumber() * gaslimitRatio)
    })
    return tx.wait()
}

export const batchClaimAndMint = async (ids: number[], term: number) => {
    const { provider, contract } = getWriteContract()
    const signer = await provider.getSigner()
    const gasLimit = await contract.connect(signer).estimateGas.estimateBatchClaimAndMint(ids, term)
    const tx = await contract.connect(signer).batchClaimAndMint(ids, term, {
        gasLimit: Math.ceil(gasLimit.toNumber() * gaslimitRatio)
    })
    return tx.wait()
}

export const callKill = async (ids: number[]) => {
    const { provider, contract } = getWriteContract()
    const signer = await provider.getSigner()
    const gasLimit = await contract.connect(signer).estimateGas.callKill(ids)
    const tx = await contract.connect(signer).callKill(ids, {
        gasLimit: Math.ceil(gasLimit.toNumber() * gaslimitRatio)
    })
    return tx.wait()
}
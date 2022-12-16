import { Contract, ethers, providers } from 'ethers'
import * as artifact from './abis/XENCrypto.json'
import { getNetworkInfo } from './rpc'

const getTheContract = () => {
    const networkInfo = getNetworkInfo()
    const jsonRPCProvider = new providers.JsonRpcProvider(networkInfo.rpcUrl)
    return new Contract(networkInfo.contracts.XENCrypto, artifact.abi, jsonRPCProvider)
}

export const getActiveMinters = async () => {
    const contract = getTheContract()
    const amount = await contract.activeMinters()
    return amount.toString()
}

export const getGlobalRank = async () => {
    const contract = getTheContract()
    const amount = await contract.globalRank()
    return amount.toString()
}

export const getCurrentMaxTerm = async () => {
    const contract = getTheContract()
    const amount = await contract.getCurrentMaxTerm()
    return amount.toNumber() / (24 * 60 * 60)
}

export const getCurrentAMP = async () => {
    const contract = getTheContract()
    const amount = await contract.getCurrentAMP()
    return amount.toString()
}

export const getCurrentAPY = async () => {
    const contract = getTheContract()
    const amount = await contract.getCurrentAPY()
    return amount.toString()
}

export const getCurrentEAAR = async () => {
    const contract = getTheContract()
    const amount = await contract.getCurrentEAAR()
    return amount.toString()
}

export const balanceOf = async (address: string) => {
    const contract = getTheContract()
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
export const getUserMintsByAddress = async (address: string) => {
    const contract = getTheContract()
    const minted = await contract.userMints(address)
    return {
        user: minted.user,
        term: minted.term.toNumber(),
        maturityTs: minted.maturityTs.toNumber(),
        rank: minted.rank.toNumber(),
        amplifier: minted.amplifier.toString(),
        eaaRate: minted.eaaRate.toString()
    }
}

export const getUserMintsByIndex = async (address: string) => {
    const contract = getTheContract()
    const minted = await contract.userMints(address)
    return {
        index: 0,
        user: minted.user,
        term: minted.term.toNumber(),
        maturityTs: minted.maturityTs.toNumber(),
        rank: minted.rank.toNumber(),
        amplifier: minted.amplifier.toString(),
        eaaRate: minted.eaaRate.toString()
    }
}
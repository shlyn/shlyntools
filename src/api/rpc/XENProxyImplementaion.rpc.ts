
import { Contract, providers } from 'ethers'
import * as artifact from './abis/XENProxyImplementation.json'
import { getNetworkInfo } from './rpc'

const getReadContract = () => {
    const networkInfo = getNetworkInfo()
    const jsonRPCProvider = new providers.JsonRpcProvider(networkInfo.rpcUrl)
    return new Contract(networkInfo.contracts.XENProxyImplementation, artifact.abi, jsonRPCProvider)
}

export const getXenCrypto = async () => {
    const contract = getReadContract()
    return await contract.xenCrypto()
}

export const getFactory = async () => {
    const contract = getReadContract()
    return await contract.factory()
}

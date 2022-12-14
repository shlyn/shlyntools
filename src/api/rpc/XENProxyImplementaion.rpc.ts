
import { Contract, providers } from 'ethers'
import * as artifact from './abis/XENProxyImplementation.json'

const infura = `${import.meta.env.VITE_URL_INFURA}/${import.meta.env.VITE_API_KEY_INFURA}`
const contractAddress = import.meta.env.VITE_ADDRESS_XEN_PROXY_IMPLEMENTAION

export const getXenCrypto = async () => {
    const jsonRPCProvider = new providers.JsonRpcProvider(infura)
    const contract = new Contract(contractAddress, artifact.abi, jsonRPCProvider)
    return await contract.xenCrypto()
}

export const getFactory = async () => {
    const jsonRPCProvider = new providers.JsonRpcProvider(infura)
    const contract = new Contract(contractAddress, artifact.abi, jsonRPCProvider)
    return await contract.factory()
}

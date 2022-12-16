import { BigNumber, ethers } from 'ethers'

export const bn2hexStr = (bn: BigNumber) => '0x' + (bn.toString()?.padStart(64, '0') || '0')

export const getCreateContractAddress = (deployer: string, nonce: number) => {
  if (nonce === 0) {
    throw "Not support this value nonce == 0"
  }
  const contractAddress = "0x".concat(ethers.utils.keccak256(ethers.utils.RLP.encode([deployer, BigNumber.from(nonce).toHexString()])).slice(-40))
  return ethers.utils.getAddress(contractAddress)
}

export const _calcCreateContractAddress = (senderAddress: string, salt: string, bytecode: string) => {
  return "0x".concat(ethers.utils.keccak256("0x".concat(["ff", senderAddress, salt, ethers.utils.keccak256(bytecode)].map((function (t) {
    return t.replace(/0x/, "")
  }
  )).join(""))).slice(-40)).toLowerCase()
}

export const getCreate2ContractAddress = function (deployer: string, bytecodeAddress: string, userAddress: string, index: number) {
  const bytecode = "0x3d602d80600a3d3981f3363d3d373d3d3d363d73".concat(bytecodeAddress.toLowerCase().replace("0x", ""), "5af43d82803e903d91602b57fd5bf3")
  const salt = ethers.utils.keccak256(ethers.utils.solidityPack(["address", "uint256"], [userAddress, index]))
  return _calcCreateContractAddress(deployer, salt, bytecode)
}

export const getBatchCreate2Address = function (deployer: string, bytecodeAddress: string, userAddress: string, ids: number[]) {
  const bytecode = "0x3d602d80600a3d3981f3363d3d373d3d3d363d73".concat(bytecodeAddress.toLowerCase().replace("0x", ""), "5af43d82803e903d91602b57fd5bf3")
  const proxys: Array<string> = []
  for(let i =0; i < ids.length; i++) {
    const salt = ethers.utils.keccak256(ethers.utils.solidityPack(["address", "uint256"], [userAddress, ids[i]]))
    proxys.push(_calcCreateContractAddress(deployer, salt, bytecode))
  }
  return proxys
}

// xen rewards
export const getOverTimeDays = (ts: number) => {
  const tsDiff = Date.now() - Number(ts)
  const dayTs = 86400000
  if (tsDiff < 0) {
    return -1
  }
  if (tsDiff === 0) {
    return 0
  }
  return tsDiff / dayTs
}

export const getRewardsPenalty = (maturityTs: number) => {
  const overTimeDays = getOverTimeDays(maturityTs * 1000)
  if (overTimeDays <= 0) {
    return 1
  } else if (overTimeDays > 7) {
    return 1 - 0.99
  } else if (overTimeDays > 6) {
    return 1 - 0.72
  } else if (overTimeDays > 5) {
    return 1 - 0.35
  } else if (overTimeDays > 4) {
    return 1 - 0.17
  } else if (overTimeDays > 3) {
    return 1 - 0.08
  } else if (overTimeDays > 2) {
    return 1 - 0.03
  } else if (overTimeDays > 1) {
    return 1 - 0.01
  } else {
    return 1
  }
}

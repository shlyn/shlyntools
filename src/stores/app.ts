// import { ref, computed } from 'vue'
import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'

interface UserInfo {
  address: string;
  chainId: string;
}

export const useUserInfoStore = defineStore('userInfo', () => {
  const userInfo = reactive<UserInfo>({
    address: '',
    chainId: ''
  })

  const currentAddress = computed(() => userInfo.address)

  const setUserInfo = (info: UserInfo) => {
    info.address && (userInfo.address = info.address)
    info.chainId && (userInfo.chainId = info.chainId)
  }

  const clearUserInfo = () => {
    userInfo.address = ''
    userInfo.chainId = ''
  } 

  return { userInfo, currentAddress, setUserInfo, clearUserInfo }
})

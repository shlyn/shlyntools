<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { useMessage, NGradientText, NFormItem, NInputNumber, NButton, NEllipsis } from 'naive-ui'
import { getMiniProxy, multiMint } from '@/api/rpc/xenFactory.rpc'

const message = useMessage()

const ellipsisStyle = {
    maxWidth: '150px'
}

const mintParams = reactive({
    count: 1,
    term: 1
})

const mintedList = [
    {
        index: 1,
        address: '0x51f92552b230e7ea3dd4591d4704b5083d1f3c10',
        unlockTime: '2023/08/01',
        reward: '20899031',
        rank: 2267327
    },
    {
        index: 2,
        address: '0x51f92552b230e7ea3dd4591d4704b5083d1f3c10',
        unlockTime: '2023/08/01',
        reward: '20899031',
        rank: 2267327
    },
    {
        index: 1,
        address: '0x51f92552b230e7ea3dd4591d4704b5083d1f3c10',
        unlockTime: '2023/08/01',
        reward: '20899031',
        rank: 2267327
    },
    {
        index: 2,
        address: '0x51f92552b230e7ea3dd4591d4704b5083d1f3c10',
        unlockTime: '2023/08/01',
        reward: '20899031',
        rank: 2267327
    },
    {
        index: 1,
        address: '0x51f92552b230e7ea3dd4591d4704b5083d1f3c10',
        unlockTime: '2023/08/01',
        reward: '20899031',
        rank: 2267327
    },
    {
        index: 2,
        address: '0x51f92552b230e7ea3dd4591d4704b5083d1f3c10',
        unlockTime: '2023/08/01',
        reward: '20899031',
        rank: 2267327
    },
    {
        index: 1,
        address: '0x51f92552b230e7ea3dd4591d4704b5083d1f3c10',
        unlockTime: '2023/08/01',
        reward: '20899031',
        rank: 2267327
    },
    {
        index: 2,
        address: '0x51f92552b230e7ea3dd4591d4704b5083d1f3c10',
        unlockTime: '2023/08/01',
        reward: '20899031',
        rank: 2267327
    },
    {
        index: 1,
        address: '0x51f92552b230e7ea3dd4591d4704b5083d1f3c10',
        unlockTime: '2023/08/01',
        reward: '20899031',
        rank: 2267327
    },
    {
        index: 2,
        address: '0x51f92552b230e7ea3dd4591d4704b5083d1f3c10',
        unlockTime: '2023/08/01',
        reward: '20899031',
        rank: 2267327
    },
    {
        index: 1,
        address: '0x51f92552b230e7ea3dd4591d4704b5083d1f3c10',
        unlockTime: '2023/08/01',
        reward: '20899031',
        rank: 2267327
    },
    {
        index: 2,
        address: '0x51f92552b230e7ea3dd4591d4704b5083d1f3c10',
        unlockTime: '2023/08/01',
        reward: '20899031',
        rank: 2267327
    },
    {
        index: 1,
        address: '0x51f92552b230e7ea3dd4591d4704b5083d1f3c10',
        unlockTime: '2023/08/01',
        reward: '20899031',
        rank: 2267327
    },
    {
        index: 2,
        address: '0x51f92552b230e7ea3dd4591d4704b5083d1f3c10',
        unlockTime: '2023/08/01',
        reward: '20899031',
        rank: 2267327
    },
    {
        index: 1,
        address: '0x51f92552b230e7ea3dd4591d4704b5083d1f3c10',
        unlockTime: '2023/08/01',
        reward: '20899031',
        rank: 2267327
    },
    {
        index: 2,
        address: '0x51f92552b230e7ea3dd4591d4704b5083d1f3c10',
        unlockTime: '2023/08/01',
        reward: '20899031',
        rank: 2267327
    },
    {
        index: 1,
        address: '0x51f92552b230e7ea3dd4591d4704b5083d1f3c10',
        unlockTime: '2023/08/01',
        reward: '20899031',
        rank: 2267327
    },
    {
        index: 2,
        address: '0x51f92552b230e7ea3dd4591d4704b5083d1f3c10',
        unlockTime: '2023/08/01',
        reward: '20899031',
        rank: 2267327
    },
    {
        index: 1,
        address: '0x51f92552b230e7ea3dd4591d4704b5083d1f3c10',
        unlockTime: '2023/08/01',
        reward: '20899031',
        rank: 2267327
    },
    {
        index: 2,
        address: '0x51f92552b230e7ea3dd4591d4704b5083d1f3c10',
        unlockTime: '2023/08/01',
        reward: '20899031',
        rank: 2267327
    },
    {
        index: 1,
        address: '0x51f92552b230e7ea3dd4591d4704b5083d1f3c10',
        unlockTime: '2023/08/01',
        reward: '20899031',
        rank: 2267327
    },
    {
        index: 2,
        address: '0x51f92552b230e7ea3dd4591d4704b5083d1f3c10',
        unlockTime: '2023/08/01',
        reward: '20899031',
        rank: 2267327
    },
]

const mintLoading = ref(false)

onMounted(async() => {
    await getMiniProxy()
})

const handMint = async() => {
    mintLoading.value = true
    try {
        await multiMint(mintParams.term, mintParams.count)
    } catch(err: any) {
        message.error(err.message || 'multiMint: error')
    }
    mintLoading.value = false
}
</script>

<template>
    <div class="xen-manual-mint">
        <div class="mint-wrapper">
            <div class="mint-desc">
                <NGradientText gradient="linear-gradient(90deg, red 0%, green 50%, blue 100%)">
                    Xen Batch Mint
                </NGradientText>
            </div>
            <div class="mint-params">
                <div class="mint-params_term params-item">
                    <NFormItem label="Term: " label-placement="left">
                        <NInputNumber v-model:value="mintParams.term" :min="1" :max="400" />
                    </NFormItem>
                </div>
                <div class="mint-params_count params-item">
                    <NFormItem label="Count: " label-placement="left">
                        <NInputNumber v-model:value="mintParams.count" :min="1" :max="100" />
                    </NFormItem>
                </div>
            </div>
            <div class="mint-button">
                <NButton type="primary" size="large" :loading="mintLoading" @click="handMint">Mint</NButton>
            </div>
        </div>
        <div class="minted-wrapper">
            <div class="mint-info-wrapper">
                Total: {{ mintedList.length }}
            </div>
            <div class="minted-list-wrapper">
                <ul class="minted-list">
                    <li class="minted-list_item" v-for="item in mintedList" :key="item.index">
                        <div class="item-row">
                            ID:&nbsp;
                            <NEllipsis :style="ellipsisStyle">
                                {{ item.index }}
                            </NEllipsis>
                        </div>
                        <div class="item-row">
                            Address:&nbsp;
                            <NEllipsis :style="ellipsisStyle">
                                {{ item.address }}
                            </NEllipsis>
                        </div>
                        <div class="item-row">
                            Mint Time:&nbsp;
                            <NEllipsis :style="ellipsisStyle">
                                111111
                            </NEllipsis>
                        </div>
                        <div class="item-row">
                            Unlock Time:&nbsp;
                            <NEllipsis :style="ellipsisStyle">
                                {{ item.unlockTime }}
                            </NEllipsis>
                        </div>
                        <div class="item-row">
                            Reward:&nbsp;
                            <NEllipsis :style="ellipsisStyle">
                                {{ item.reward }}
                            </NEllipsis>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.xen-manual-mint {
    width: 100%;
    height: 100%;
    user-select: none;

    .mint-wrapper {
        width: 100%;
        height: 40%;
        padding: 12px;
        border: 1px solid rgba(0, 0, 0, 0.1);
        box-shadow: $boxShadow1;
        border-radius: $borderRadius1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .mint-desc {
            text-align: center;
            font-size: 24px;
        }

        .mint-params {
            margin-top: 12px;
            display: flex;
            justify-content: center;
            align-items: center;

            .params-item {
                margin-left: 24px;

                &:first-child {
                    margin-left: 0;
                }
            }
        }
    }

    .minted-wrapper {
        width: 100%;
        height: 45%;
        overflow: hidden;
        overflow-y: auto;
        margin-top: 5%;
        border: 1px solid rgba(0, 0, 0, 0.1);
        box-shadow: $boxShadow1;
        border-radius: $borderRadius1;
        .mint-info-wrapper {
            padding: 12px;
            display: flex;
        }

        .minted-list-wrapper {
            .minted-list {
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                padding: 0;

                .minted-list_item {
                    width: calc(20% - 12px);
                    padding: 8px 10px;
                    margin-top: 12px;
                    margin-left: 10px;
                    border: 1px solid rgba(0, 0, 0, 0.1);
                    box-shadow: $boxShadow1;
                    border-radius: $borderRadius1;
                    cursor: pointer;
                    // &:nth-child(5n+1) {
                    //     margin-left: 0;
                    // }
                    &:hover {
                        border: 1px solid green;
                    }
                    .item-row {
                        margin-top: 4px;
                        display: flex;
                        white-space: nowrap;
                        align-items: center;
                    }
                }
            }
        }
    }
}
</style>
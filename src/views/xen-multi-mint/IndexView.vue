<script setup lang="ts">
import { reactive, ref } from 'vue'
import { NFormItem, NInputNumber, NButton } from 'naive-ui'

const mintParams = reactive({
    count: 10,
    term: 100
})

const mintLoading = ref(false)

const handMint = () => {
    mintLoading.value = true
}

</script>

<template>
    <div class="xen-manual-mint">
        <div class="mint-wrapper">
            <div class="mint-desc">
                Xen Batch Mint
            </div>
            <div class="mint-params">
                <div class="mint-params_count params-item">
                    <NFormItem label="Count: " label-placement="left">
                        <NInputNumber v-model:value="mintParams.count" :min="1" :max="100"/>
                    </NFormItem>
                </div>
                <div class="mint-params_term params-item">
                    <NFormItem label="Term: " label-placement="left">
                        <NInputNumber v-model:value="mintParams.term"  :min="1" :max="400"/>
                    </NFormItem>
                </div>
            </div>
            <div class="mint-button">
                <NButton type="primary" size="large" :loading="mintLoading" @click="handMint">Mint</NButton>
            </div>
        </div>
        <div class="minted-result">
            fff
        </div>
    </div>
</template>

<style lang="scss" scoped>
.xen-manual-mint {
    width: 100%;
    height: 100%;
    text-align: center; 

    .mint-wrapper {
        width: 100%;
        height: 40%;
        padding: 12px;
        border: 1px solid rgba(0,0,0,0.1);
        box-shadow: $boxShadow1;
        border-radius: $borderRadius1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .mint-desc {
           text-align: center; 
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
    .minted-result {
        width: 100%;
        height: 45%;
        overflow: hidden;
        overflow-y: auto;
        padding: 12px;
        margin-top: 5%;
        border: 1px solid rgba(0,0,0,0.1);
        box-shadow: $boxShadow1;
        border-radius: $borderRadius1;
    }
}
</style>
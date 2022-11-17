<script setup lang="ts">
</script>
<template>
    <div class="header-wrapper">
        <div class="left-bar">
            <ul class="menu-list">
                <li class="menu-item">XEN</li>
            </ul>
        </div>
        <div class="right-bar">
            <ul class="button-list">
                <li class="button-item">connect</li>
            </ul>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.header-wrapper {
    height: 100%;
    padding: 0 24px;
    font-size: 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left-bar {
        .menu-list {
            display: flex;
            flex-direction: row;
            .menu-item {
                min-width: 64px;
                padding: 6px 8px;
                margin-left: 12px;
                font-weight: 500;
                border-radius: 4px;
                user-select: none;
                color: rgba(0,0,0,0.6);
                font-size: 18px;
                line-height: 1.75;
                text-transform: uppercase;
                cursor: pointer;
            }
        }
    }
    .right-bar {
        .button-list {
            display: flex;
        }
    }
}
</style>
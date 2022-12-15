import { h, type Component } from 'vue'
import { RouterLink } from 'vue-router'
import { NIcon } from 'naive-ui'
import type { MenuOption, SelectGroupOption } from 'naive-ui'

// https://ionic.io/ionicons
import {
    HomeOutline,
    CloseOutline,
    GlobeOutline,
    ReaderOutline,
    BuildOutline
} from '@vicons/ionicons5'

const renderIcon = (icon: Component) => {
    return () => h(NIcon, null, { default: () => h(icon) })
}

export const menuOptions: MenuOption[] = [
    {
        label: "Home",
        key: '/home',
        icon: renderIcon(HomeOutline)
    },
    {
        key: 'divider-1',
        type: 'divider',
    },
    {
        label: 'Tools',
        key: '/tools',
        icon: renderIcon(BuildOutline),
        children: [
            {
                label: 'Contract Deploy',
                key: '/tools/contract-deploy',
                icon: renderIcon(ReaderOutline)
            }
        ]
    },
    {
        key: 'divider-2',
        type: 'divider'
    },
    {
        label: 'XENCrypto',
        key: '/xen-crypto',
        icon: renderIcon(CloseOutline),
        children: [
            {
                label: 'Batch Mint',
                key: '/xen-crypto/batch-mint',
                icon: renderIcon(ReaderOutline),
            },
            {
                label: 'Subgraph',
                key: '/xen-crypto/subgraph',
                icon: renderIcon(GlobeOutline)
            }
        ]
    }
]

export const networkOptionList: SelectGroupOption[] = [
    {
        type: 'group',
        label: 'Mainnet Network',
        key: 'mainnet_',
        children: [
            {
                label: 'Ethereum',
                value: '0x1',
            },
            {
                label: 'Polygon',
                value: '0x89',
                disabled: true
            },
            {
                label: 'BSC-Mainnet',
                value: '0x38',
                disabled: true
            }
        ]
    },
    {
        type: 'group',
        label: 'Test Network',
        key: 'test_',
        children: [
            {
                label: 'Goerli-Test',
                value: '0x5'
            }
        ]
    }
]
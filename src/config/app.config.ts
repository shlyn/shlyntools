import { h, type Component } from 'vue'
import { RouterLink } from 'vue-router'
import { NIcon } from 'naive-ui'
import type { MenuOption, SelectGroupOption } from 'naive-ui'

// https://ionic.io/ionicons
import { HomeOutline, CreateOutline, CloseOutline, HammerOutline, GlobeOutline } from '@vicons/ionicons5'

const renderIcon = (icon: Component) => {
    return () => h(NIcon, null, { default: () => h(icon) })
}

export const menuOptions: MenuOption[] = [
    {
        label: () => h(
            RouterLink,
            {
                to: {
                    path: '/'
                }
            },
            {
                default: () => "Home"
            }
        ),
        key: 'menu-item_home',
        icon: renderIcon(HomeOutline)
    },
    {
        key: 'divider-1',
        type: 'divider',
        props: {
            style: {
                marginLeft: '32px'
            }
        }
    },
    {
        label: 'XENCrypto',
        key: 'menu-item_xen_crypto',
        icon: renderIcon(CloseOutline),
        children: [
            {
                label: () => h(
                    RouterLink,
                    {
                        to: {
                            path: '/xen-multi-mint'
                        }
                    },
                    {
                        default: () => "Manual batch mint"
                    }
                ),
                key: "xen-multi-mint",
                icon: renderIcon(CreateOutline),
            },
            {
                label: () => h(
                    RouterLink,
                    {
                        to: {
                            path: '/xen-subgraph'
                        }
                    },
                    {
                        default: () => "XENCrypto subgraph"
                    }
                ),
                key: "xen-subgraph",
                icon: renderIcon(GlobeOutline)
            }
        ]
    },
    {
        key: 'divider-1',
        type: 'divider',
        props: {
            style: {
                marginLeft: '32px'
            }
        }
    },
    {
        label: 'Contract Tool',
        key: 'menu_item_contract_tool',
        icon: renderIcon(HammerOutline),
        children: [
            {
                label: () => h(
                    RouterLink,
                    {
                        to: {
                            path: '/contract-tool'
                        }
                    },
                    {
                        default: () => "Contract Tool"
                    }
                ),
                key: 'menu-item_contract-tool'
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
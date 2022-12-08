import { h, type Component } from 'vue'
import { RouterLink } from 'vue-router'
import { NIcon } from 'naive-ui'

import type { MenuOption } from 'naive-ui'
import { HomeOutline, BookOutline, PeopleOutline } from '@vicons/ionicons5'

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
        icon: renderIcon(BookOutline),
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
                icon: renderIcon(PeopleOutline),
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
                key: "xen-subgraph"
            }
        ]
    }
]
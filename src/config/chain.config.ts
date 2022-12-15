interface Contracts {
    XENCrypto: string;
    XENProxyImplementation: string;
    XENFactory: string;
}
interface ChainItem {
    Id: string;
    Name: string;
    rpcUrl: string;
    blockExplorer: string;
    Infura?: string;
    Alchemy?: string;
    contracts: Contracts;
}

/// https://chainlist.org/zh
const chainList: ChainItem[] = [
    {
        Id: '0x1',
        Name: 'Mainnet',
        blockExplorer: 'https://etherscan.io/',
        rpcUrl: '#',
        Infura: 'https://mainnet.infura.io/v3/',
        Alchemy: 'https://eth-mainnet.g.alchemy.com/v2/',
        contracts: {
            XENCrypto: '0x06450dee7fd2fb8e39061434babcfc05599a6fb8',
            // upgradeable
            XENProxyImplementation: '',
            XENFactory: '',
            // non-upgradeable
            // XENProxyImplementation: '',
            // XENFactory: ''
        }
    },
    {
        Id: '0x5',
        Name: 'Goerli-Test',
        rpcUrl: '#',
        blockExplorer: 'https://goerli.etherscan.io/',
        Infura: 'https://goerli.infura.io/v3/',
        Alchemy: 'https://eth-goerli.g.alchemy.com/v2/',
        contracts: {
            XENCrypto: '0xDd68332Fe8099c0CF3619cB3Bb0D8159EF1eCc93',
            // upgradeable
            XENProxyImplementation: '0x02C9ae4fC832154DE4CA402541Cc5F0A867E7C68',
            XENFactory: '0xA3d29784d8A8CD7e8099115f782942669f7bC314',
            // non-upgradeable
            // XENProxyImplementation: '0x21713C1F9c623d42459CaC85745322cA8d601dAd',
            // XENFactory: '0x5c61c59E7D668f418aAeC976FE23Ae6f2455FF80'
        }
    },
    {
        Id: '0x89',
        Name: 'Polygon-Mainnet',
        rpcUrl: 'https://polygon-mainnet-public.unifra.io',
        blockExplorer: 'https://bscscan.com/',
        contracts: {
            XENCrypto: '',
            XENProxyImplementation: '',
            XENFactory: ''
        }
    },
    {
        Id: '0x38',
        Name: 'BSC-Mainnet',
        rpcUrl: 'https://bscrpc.com',
        blockExplorer: 'https://polygonscan.com/',
        contracts: {
            XENCrypto: '',
            XENProxyImplementation: '',
            XENFactory: ''
        }
    }
]

export const getNetworkConfig = (chainId: string) => {
    const network = chainList.find(item => item.Id == chainId)
    if (network?.Id) {
        return network
    } else {
        throw 'Network Error'
    }
}

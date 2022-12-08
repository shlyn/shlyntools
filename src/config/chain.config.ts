interface ChainItem {
    chainId: string;
    chainName: string;
    rpcUrls: string[];
}
// https://chainlist.org/zh
export const chainList: ChainItem[] = [
    {
        chainId: '0x01',
        chainName: '',
        rpcUrls: ['https://...']
    }
]
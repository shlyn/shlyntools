export const metamaskDetect = () => (typeof window.ethereum !== 'undefined')

export const isConnect = async () => window.ethereum?.isConnected()

/**
 * code:
 * eip 1193: https://eips.ethereum.org/EIPS/eip-1193#provider-errors
 * 4001 The request was rejected by the user
 * 4100 unauthorized
 * 4200 unsupported method
 * 4900 disconnected
 * 4901 chain disconnected
 * 
 * eip-1474: https://eips.ethereum.org/EIPS/eip-1474#error-codes
 * -32600 Invalid request
 * -32601 method not found
 * -32602 The parameters were invalid
 * -32603 Internal error
 */
export interface ProviderRpcError extends Error {
    message: string;
    code: number;
    data?: unknown;
}

interface ParamItem {
    from?: string;
    to?: string;
    gas?: string; // '0x76c0' 30400
    gasPrice?: string; // '0x9184e72a000' 10000000000000
    value?: string; // '0x9184e72a' 2441406250
    data?: string; // '0xd46e8dd...'
}

interface RequestArguments {
    method: 'eth_requestAccounts'|'eth_sendTransaction';
    params?: ParamItem[]|unknown[];
}
export const walletRequest = async (args: RequestArguments) => window.ethereum?.request(args)

/**
 * following wallet event
 */
type WalletEvent = 'accountsChanged' | 'chainChanged' | 'connect' | 'disconnect' | 'message'

export const listenWalletEvent = (event: WalletEvent, call: (arg: unknown) => void) => {
    window.ethereum?.on(event, call)
}

export const removeWalletEvent = (event: WalletEvent, call: (arg: unknown) => void) => {
    window.ethereum?.removeListener(event, call)
}

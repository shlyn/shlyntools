/// <reference types="vite/client" />
declare module '*.vue' {
    import { defineComponent } from 'vue';
    export default defineComponent;
}

interface ImportMetaEnv {
    readonly VITE_GASLIMIT_RATIO: string;

    readonly VITE_GRAPHQL_APIURL: string;
    readonly VITE_THEGRAPH_APIKEY: string;
    readonly VITE_API_KEY_INFURA: string;
    readonly VITE_URL_INFURA: string;
    readonly VITE_API_KEY_ETHERESCAN: string;
    readonly VITE_API_KEY_ALCHEMY: string;

    readonly VITE_ADDRESS_XEN: string;
    readonly VITE_ADDRESS_XEN_PROXY_IMPLEMENTAION: string;
    readonly VITE_ADDRESS_XEN_FACTORY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

interface Window {
    readonly ethereum: any;
}
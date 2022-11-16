/// <reference types="vite/client" />
declare module '*.vue' {
    import { defineComponent } from 'vue';
    export default defineComponent;
}

interface ImportMetaEnv {
    readonly VITE_GRAPHQL_APIURL: string;
    readonly VITE_THEGRAPH_APIKEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}

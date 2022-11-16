import ApolloClient  from 'apollo-boost'

const APIURL = import.meta.env.VITE_GRAPHQL_APIURL

export const client = new ApolloClient({
    uri: APIURL
})

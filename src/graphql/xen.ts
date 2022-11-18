import { client } from './client'
import { gql } from 'apollo-boost'

export const testQuery = (user?: string) => {
    // const userAddress = user.toLowerCase()

    // rankClaimedEntities(first: 5, where: { userAddress_not: ${userAddress}}) {
    return client.query({
        query: gql(`
        query {
            rankClaimedEntities(first: 1000, skip: 2000) {
                id
                userAddress
                platformAddress
                mintAddress
        }
    }`)
    })
}

import { client } from './client'
import { gql } from 'apollo-boost'

export const testQuery = (user: string) => {
    const userAddress = user.toLowerCase()

    return client.query({
        query: gql(`
        query {
            rankClaimedEntities(first: 5, where: { userAddress_not: ${userAddress}}) {
                id
                userAddress
                platformAddress
                mintAddress
        }
    }`)
    })
}

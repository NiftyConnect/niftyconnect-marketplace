import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'

export const applloClient = () => {
  const chainId = 1
  return new ApolloClient({
    link: new HttpLink({
      uri:
        chainId === 1
          ? 'https://api.thegraph.com/subgraphs/name/redefiine/nifty-connect'
          : 'https://api.thegraph.com/subgraphs/name/redefiine/ncpbnb',
    }),
    cache: new InMemoryCache(),
  })
}

export const healthClient = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.thegraph.com/graphql',
  }),
  cache: new InMemoryCache(),
})

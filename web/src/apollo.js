import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  HttpLink
} from "@apollo/client";

const httpLink = new HttpLink({uri: 'http://localhost:4000/'})

const authMiddleware = new ApolloLink((operation, forward) => {
  
  // Agrega autorizacion al header
  operation.setContext({
    headers: {
      'authorization': localStorage.getItem('token') || null,
    }
  });

  return forward(operation);
})

const client = new ApolloClient({
  link: authMiddleware.concat(httpLink),
  onError: (e) => {
    console.log(e)
  },
  cache: new InMemoryCache()
});

export default client;
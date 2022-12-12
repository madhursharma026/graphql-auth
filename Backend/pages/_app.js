import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';

function MyApp({ Component, pageProps }) {

  const client = new ApolloClient({ uri: 'http://localhost:3000/graphql' });
  
  return (
    <div className="container">
    <ApolloProvider client={client}>
        <Component {...pageProps} />
        </ApolloProvider>
    </div>
  )
}

export default MyApp


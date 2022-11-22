import { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.scss';
import { ApolloProvider } from '@apollo/client';
import client from '../utils/apollo-client';
import {
  cookieStore,
  OidcConfiguration,
  OidcProvider,
} from '@fundthatflip/ftf-auth-library';
import { useRouter } from 'next/router';
import '@module-federation/nextjs-mf/src/include-defaults';
import { Header } from '../components/organisms/Header/Header';

const redirect = `${process.env.DOMAIN}/callback`;
const configuration: OidcConfiguration = {
  client_id: process.env.CLIENT_ID!,
  redirect_uri: redirect,
  scope: 'openid profile email',
  authority: process.env.COGNITO_POOL!,
  authority_configuration: {
    authorization_endpoint: `${process.env.COGNITO_DOMAIN}/oauth2/authorize`,
    token_endpoint: `${process.env.COGNITO_DOMAIN}/oauth2/token`,
    revocation_endpoint: `${process.env.COGNITO_DOMAIN} /oauth2/revoke`,
    end_session_endpoint: `${process.env.COGNITO_DOMAIN}/logout`,
    userinfo_endpoint: `${process.env.COGNITO_DOMAIN}/oauth2/userInfo`,
    issuer: process.env.COGNITO_POOL!,
  },
  service_worker_only: false,
  monitor_session: true,
  storage: cookieStore(`oidc.default:${redirect}`, 'local', 3600),
};

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const withCustomHistory = () => ({
    replaceState: (url: any) => {
      router
        .replace({
          pathname: url,
        })
        .then(() => {
          window.dispatchEvent(new Event('popstate'));
        });
    },
  });

  const TempLoader = () => <div>Loading...</div>;

  return (
    <OidcProvider
      configuration={configuration}
      loadingComponent={TempLoader}
      sessionLostComponent={TempLoader}
      authenticatingComponent={TempLoader}
      authenticatingErrorComponent={TempLoader}
      callbackSuccessComponent={TempLoader}
      serviceWorkerNotSupportedComponent={TempLoader}
      withCustomHistory={withCustomHistory}
    >
      <ApolloProvider client={client}>
        <Head>
          <title>TODO SPA</title>
        </Head>
        <main className="app">
          <Header />

          <Component {...pageProps} />
        </main>
      </ApolloProvider>
    </OidcProvider>
  );
}

export default App;

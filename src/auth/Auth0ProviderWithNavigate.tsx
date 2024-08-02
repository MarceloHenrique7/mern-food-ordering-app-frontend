import { AppState, Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

// https://manage.auth0.com/dashboard/us/dev-myuvwgpto3kneq2z/applications/jk0FtEXeOIqkgqRjbLjomDA4xSMPkPPs/settings

type Props = {
    children: React.ReactNode
}

// type UserObject = {
//     auth0Id: string;
//     email: string;
// };

const Auth0ProviderWithNavigate = ({ children }: Props) => {
    const navigate = useNavigate();

    // Coisas que precisamos sempre que inicialiar o SDK
    const domain = import.meta.env.VITE_AUTH0_DOMAIN; // definido uma credencial para poder se connectar com o Auth0 onde o usuario vai logar pelo nosso front end
    const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;
    const audience = import.meta.env.VITE_AUTH0_AUDIENCE
    
    if (!domain || !clientId || !redirectUri || !audience) {
        throw new Error("Unable to initialize auth") // checando se essas variaveis de ambientes existem
    }

    const onRedirectCallback = (appState?: AppState) => { // essa função e chamada quando o usuario e redirecionado de volta para pagina após login
        // recebemos um parâmetro que e do Tipo AppState
        navigate(appState?.returnTo || "/auth-callback")

        /*
            navigate(appState?.returnTo || "/auth-callback")
            aqui dizemos: se em appState tivermos uma propiedade returnTo,
            use isso para redirecionar o usuario

            se não redirecione ele para essa url: /auth-callback
        */
    }

    return (
    <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{
        redirect_uri: redirectUri, // sempre que o usuario fizer login pela pagina de fora (auth0) vamos tentar envia-lo para essa url
        audience,
        }}
        onRedirectCallback={onRedirectCallback}
    >
        {children}
    </Auth0Provider>
  )
}


export default Auth0ProviderWithNavigate

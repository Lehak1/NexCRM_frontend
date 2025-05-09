import { Auth0Provider } from "@auth0/auth0-react";
import type { AppState } from "@auth0/auth0-react";

import { useNavigate } from "react-router-dom";

type Props={
    children:React.ReactNode;
}
 const Auth0providerwithNavigate=({children}:Props)=> {
   const navigate=useNavigate();
 
    const domain=import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId=import.meta.env.VITE_AUTH0_CLIENT_ID;
const redirectUri=import.meta.env.VITE_AUTH0_CALLBACK_URL;
// const audience=import.meta.env.VITE_AUTH0_AUDIENCE;

if(!domain || !clientId || !redirectUri ){             
  // || !audience 
    throw new Error("unable to initialise auth");
}
//user:current logged in user,appstate contains stored data that we might need when the user gets redirrected
//when the user gets redirrected back after authentication
const onRedirectCallback=(appState?:AppState)=>{

  
  navigate(appState?.returnTo || "/auth-callback"); 

}

return(
    <Auth0Provider  domain={domain}
    clientId={clientId}
    authorizationParams={{
       redirect_uri:redirectUri,
      //  audience ,
    }}
onRedirectCallback={onRedirectCallback}
>
      {children}

    </Auth0Provider>
)

}


export default Auth0providerwithNavigate;

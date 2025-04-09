import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import keycloak from './keycloak/keycloak.ts'
import { setupToken } from './keycloak/refreshToken.ts';

keycloak.init({
    onLoad: 'login-required',
}).then((authenticated) => {
    if (authenticated) {
        console.log(`Utilisateur authentifié :`, keycloak.tokenParsed);
        setupToken();
        createRoot(document.getElementById("root")!).render(<App />);
    } else {
        console.error(`Échec de l'authentification`);
    }
})
.catch((error) => {
    console.error(`Erreur lors de l'authentification de Keycloak : ${error}`);
});


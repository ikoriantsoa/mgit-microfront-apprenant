import keycloak from "./keycloak";

export const refreshToken = async () => {
  try {
    const refreshed: boolean = await keycloak.updateToken(30);

    if (refreshed) {
      console.log(`Access token rafraichi avec succès.`);
    } else {
      console.log(`Le token n'était pas encore expiré.`);
    }

    const realmRoles: string[] =
      keycloak.tokenParsed?.realm_access?.roles || [];
    const clientRoles: string[] =
      keycloak.tokenParsed?.resource_access?.[keycloak.clientId]?.roles || [];
    const userRoles: string[] = [...realmRoles, ...clientRoles];

    console.log(`Rôles mise à jour : ${userRoles}`);
  } catch (error) {
    console.error(`Erreur lors du rafraîshissement du token : ${error}`);
    keycloak.logout({ redirectUri: window.location.origin });
  }
};

export const setupToken = () => {
  setInterval(async () => {
    await refreshToken();
  }, 5 * 60 * 1000);
};

// var appConfig = require("./default");
export default {
  auth: {
    endpoint: "auth",
    configureEndpoints: ["auth", "core"],

    loginUrl: "authenticate",
    profileUrl: "/me",

    authTokenType: "JWT",
    accessTokenProp: "data",

    storageChangedReload: true
  },
  endpoints: {
    // auth: "https://academy-auth-webapi-pinkgorilla.c9users.io/v1/",
    auth: "https://dl-auth-api-dev.mybluemix.net/v1/",
    core: ""
  }
};

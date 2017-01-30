var config = {
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
    auth: "",
    core: ""
  }
}; 

module.export = config;

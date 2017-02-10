var environment = process.env.NODE_ENV;
var config = require(`./${environment}.js`);
var _default = {
  auth: {
    endpoint: "auth",
    configureEndpoints: ["auth", "core"],

    loginUrl: "authenticate",
    profileUrl: "/me",

    authTokenType: "",
    accessTokenProp: "id",

    storageChangedReload: true
  },
  endpoints: {
    auth: "",
    core: ""
  }
};

config = _default;
console.log("default")
module.export = config;

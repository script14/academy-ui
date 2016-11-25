export default {
    endpoint: 'auth',
    configureEndpoints: ['auth', 'master'],
    loginUrl: 'authenticate',
    signupUrl: 'users',
    profileUrl: 'me',
    unlinkUrl: 'me/unlink',
    loginOnSignup: false,
    storageChangedReload: true,    // ensure secondary tab reloading after auth status changes
    expiredRedirect: 1,            // redirect to logoutRedirect after token expiration
    authTokenType: 'JWT',
    httpInterceptor: true,
    providers: {
        google: {
            url: 'google',
            clientId: '239531536023-ibk10mb9p7ullsw4j55a61og5lvnjrff6.apps.googleusercontent.com'
        },
        facebook: {
            url: 'facebook',
            clientId: '1465278217541708498'
        }
    },
    getAccessTokenFromResponse: (response) => {
        if (response && response.data)
            return response.data;
        return null;
    }
};
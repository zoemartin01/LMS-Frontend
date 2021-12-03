export const environment = {
  production: true,
  baseUrl: 'http://localhost:3000/api/v1',

  //localStorage
  storageKeys: {
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    userRole: 'userRole',
  },

  //routes
  apiRoutes: {
    loginRoute: '/token',
    tokenRefreshRoute: '/token/refresh',
    logoutRoute: '/token',
    tokenTestRoute: '/token/test',
  }
};

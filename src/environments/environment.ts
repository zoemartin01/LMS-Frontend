export const environment = {
  production: false,
  baseUrl: 'http://localhost:3000/api/v1',

  //localStorage
  storageKeys: {
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    userRole: 'userRole',
  },

  //routes
  loginRoute: '/token',
  tokenRefreshRoute: '/token/refresh',
  logoutRoute: '/token',
  tokenTestRoute: '/token/test',
};

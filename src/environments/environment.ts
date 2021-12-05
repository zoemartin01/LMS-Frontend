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
  apiRoutes: {
    //auth
    userDetails: '',
    login: '/token',
    tokenRefresh: '/token/refresh',
    logout: '/token',
    tokenTest: '/token/test',
    signin: '',
    verifyEmail: '',
  }
};

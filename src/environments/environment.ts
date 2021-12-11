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
    userDetails: '/user',
    login: '/token',
    tokenRefresh: '/token/refresh',
    logout: '/token',
    tokenCheck: '/token/check',
    signin: '/user',
    verifyEmail: '/user/verify',
    updateUser: '/user',

    //messaging


    //admin (general settings & user management)

    //room management

    //appointment management

    //inventory management

    //order management

    //livecam
  }
};

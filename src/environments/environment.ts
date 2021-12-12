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
    signin: '/users',
    verifyEmail: '/user/verify',
    updateUser: '/user',

    //messaging

    //admin (general settings & user management)

    //room management
    rooms: '/rooms',
    viewRoom: '/rooms/:id',
    createRoom: '/rooms',
    editRoom: '/rooms/:id',
    deleteRoom: '/rooms',

    //appointment management
    myAppointments: '/appointments',
    allAppointments: '/user/appointments',
    viewAppointment: '/appointments/:id',
    editAppointment: '/appointments/:id/edit',
    createAppointment: '/appointments',

    //inventory management

    //order management

    //livecam
  }
};

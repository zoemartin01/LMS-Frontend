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

    //appointments
    myAppointments: '',
    allAppointments: '/all',
    viewAppointment: '/:id',
    editAppointment: '/:id/edit',
    createAppointment: '/create',
    roomOverview: '',
    //TODO from roomOverview editAppointment: ':id/edit',
    //TODO from roomOverview createAppointment: '/create'

    //room
  }
};

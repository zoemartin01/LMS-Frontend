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
    createAvailableTimeslot: '/rooms/:id/availableTimeslot',
    createUnavailableTimeslot: '/rooms/:id/unavailableTimeslot',
    deleteAvailableTimeslot: '/rooms/:room_id/availableTimeslot/:timeslot_id',
    deleteUnavailableTimeslot: '/rooms/:room_id/unavailableTimeslot/:timeslot_id',

    //appointment management
    myAppointments: '/user/appointments',
    allAppointments: '/appointments',
    appointmentsForRoom: '/rooms/:id/appointments',
    viewAppointment: '/appointments/:id',
    editAppointment: '/appointments/:id/edit',
    createAppointment: '/appointments',
    deleteAppointment: '/appointments/:id',

    //inventory management

    //order management

    //livecam


    //livecam
    recordings: '/livecam/recordings',
    getRecording: '/livecam/recordings/:id',
    scheduleRecording: '/livecam/recordings/schedule',
    deleteRecording: '/livecam/recordings/:id/download',
    downloadRecording: '/livecam/recordings/:id',
  }
};

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
    login: '/token',
    logout: '/token',
    tokenRefresh: '/token/refresh',
    tokenCheck: '/token/check',

    //messaging
    getMessages: '/user/messages',
    getUnreadMessagesAmounts: '/user/messages/unread-amounts',
    deleteMessage: '/messages/:id',
    updateMessage: '/messages/:id',

    //personal user settings
    getThisUser: '/user',
    register: '/users',
    verifyEmail: '/user/verify-email',
    updateThisUser: '/user',
    deleteThisUser: '/user',

    //admin (general settings & user management)
    getGlobalSettings: '/global-settings',
    updateGlobalSettings: '/global-settings',

    getWhitelistRetailer: '/global-settings/whitelist-retailers/:id',
    createWhitelistRetailer: '/global-settings/whitelist-retailers',
    updateWhitelistRetailer: '/global-settings/whitelist-retailers/:id',
    deleteWhitelistRetailer: '/global-settings/whitelist-retailers/:id',
    addDomainToWhitelistRetailer: '/global-settings/whitelist-retailers/:id/domains',
    editDomainOfWhitelistRetailer: '/global-settings/whitelist-retailers/:id/domains/:domainId',
    deleteDomainOfWhitelistRetailer: '/global-settings/whitelist-retailers/:id/domains/:domainId',
    checkDomainAgainstWhitelist: '/global-settings/whitelist-retailers/check',

    getUsers: '/users',
    getUser: '/users/:id',
    updateUser: '/users/:id',
    deleteUser: '/users/:id',

    //room management
    rooms: '/rooms',
    viewRoom: '/rooms/:id',
    createRoom: '/rooms',
    editRoom: '/rooms/:id',
    deleteRoom: '/rooms/:id',
    createTimeslot: '/rooms/:roomId/timeslots',
    deleteTimeslot: '/rooms/:roomId/timeslots/:timeslotId',

    //appointment management
    allAppointments: '/appointments',
    myAppointments: '/user/appointments',
    appointmentsForRoom: '/rooms/:id/appointments',
    appointmentsForSeries: '/appointments/series/:id',
    viewAppointment: '/appointments/:id',
    createAppointment: '/appointments',
    createAppointmentSeries: '/appointments/series',
    editAppointment: '/appointments/:id',
    editAppointmentSeries: '/appointments/series/:id',
    deleteAppointment: '/appointments/:id',
    deleteAppointmentSeries: '/appointments/series/:id',

    //inventory management
    getAllInventoryItems: '/inventory-items',
    getInventoryItem: '/inventory-items/:id',
    createInventoryItem: '/inventory-items',
    updateInventoryItem: '/inventory-items/:id',
    deleteInventoryItem: '/inventory-items/:id',

    //order management
    getAllOrders: '/orders',
    getOrdersForCurrentUser: '/user/orders',
    getOrder: '/orders/:id',
    createOrder: '/orders',
    updateOrder: '/orders/:id',
    deleteOrder: '/orders/:id',

    //livecam
    recordings: '/livecam/recordings',
    scheduledRecordings: '/livecam/recordings/schedules',
    getRecording: '/livecam/recordings/:id',
    scheduleRecording: '/livecam/recordings/schedules',
    updateRecording: '/livecam/recordings/:id',
    downloadRecording: '/livecam/recordings/:id/download',
    deleteRecording: '/livecam/recordings/:id',
    livestreamFeed: '/livecam/stream'
  }
};

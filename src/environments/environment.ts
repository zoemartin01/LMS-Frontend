export const environment = {
  production: false,
  baseUrl: 'http://localhost:3000/api/v1',

  //localStorage
  storageKeys: {
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    userId: 'userId',
    userRole: 'userRole',
  },

  defaultPageSize: 3,

  //routes
  apiRoutes: {
    auth: {
      login: '/token',
      logout: '/token',
      tokenRefresh: '/token/refresh',
      tokenCheck: '/token/check',
    },
    messages: {
      getCurrentUserMessages: '/user/messages',
      getCurrentUserUnreadMessagesAmounts: '/user/messages/unread-amounts',

      deleteMessage: '/messages/:id',
      updateMessage: '/messages/:id',
    },
    user_settings: {
      getCurrentUser: '/user',

      register: '/users',
      updateCurrentUser: '/user',
      deleteCurrentUser: '/user',

      verifyEmail: '/user/verify-email',
    },
    admin_settings: {
      getGlobalSettings: '/application-settings',
      updateGlobalSettings: '/application-settings',

      getWhitelistRetailer: '/application-settings/whitelist-retailers/:id',
      getWhitelistRetailers: '/application-settings/whitelist-retailers',

      createWhitelistRetailer: '/application-settings/whitelist-retailers',
      updateWhitelistRetailer: '/application-settings/whitelist-retailers/:id',
      deleteWhitelistRetailer: '/application-settings/whitelist-retailers/:id',

      addDomainToWhitelistRetailer: '/application-settings/whitelist-retailers/:id/domains',
      updateDomainOfWhitelistRetailer: '/application-settings/whitelist-retailers/:id/domains/:domainId',
      deleteDomainOfWhitelistRetailer: '/application-settings/whitelist-retailers/:id/domains/:domainId',

      checkDomainAgainstWhitelist: '/application-settings/whitelist-retailers/check',
    },
    user_management: {
      getAllPendingUsers: '/users/pending',
      getAllAcceptedUsers: '/users/accepted',
      getSingleUser: '/users/:id',

      updateUser: '/users/:id',
      deleteUser: '/users/:id',
    },
    rooms: {
      getAllRooms: '/rooms',
      getSingleRoom: '/rooms/:id',
      getTimeslot: '/rooms/:id/timeslot/:timeslotId',
      getRoomCalendar: '/rooms/:id/calendar',
      getAvailabilityCalendar: '/rooms/:id/availability-calendar',

      createRoom: '/rooms',
      updateRoom: '/rooms/:id',
      deleteRoom: '/rooms/:id',

      getAllAvailableTimeslotsForRoom: '/rooms/:roomId/timeslots/available',
      getAllUnavailableTimeslotsForRoom: '/rooms/:roomId/timeslots/unavailable',

      createTimeslot: '/rooms/:roomId/timeslots',
      deleteTimeslot: '/rooms/:roomId/timeslots/:timeslotId',
    },
    appointments: {
      getCurrentUserAppointments: '/user/appointments',
      getRoomAppointments: '/rooms/:id/appointments',
      getSeriesAppointments: '/appointments/series/:id',

      getAllAppointments: '/appointments',
      getSingleAppointment: '/appointments/:id',

      createAppointment: '/appointments',
      createAppointmentSeries: '/appointments/series',
      updateAppointment: '/appointments/:id',
      updateAppointmentSeries: '/appointments/series/:id',
      deleteAppointment: '/appointments/:id',
      deleteAppointmentSeries: '/appointments/series/:id',

    },
    inventory_item: {
      getAllItems: '/inventory-items',
      getSingleItem: '/inventory-items/:id',
      getByName: '/inventory-items/name/:name',

      createItem: '/inventory-items',
      updateItem: '/inventory-items/:id',
      deleteItem: '/inventory-items/:id',
    },
    orders: {
      getCurrentUsersPendingOrders: '/user/orders/pending',
      getCurrentUsersAcceptedOrders: '/user/orders/accepted',
      getCurrentUsersDeclinedOrders: '/user/orders/declined',

      getAllPendingOrders: '/orders/pending',
      getAllAcceptedOrders: '/orders/accepted',
      getAllDeclinedOrders: '/orders/declined',

      getSingleOrder: '/orders/:id',

      createOrder: '/orders',
      updateOrder: '/orders/:id',
      deleteOrder: '/orders/:id',
    },
    livecam: {
      getAllRecordings: '/livecam/recordings',
      getAllScheduled: '/livecam/recordings/schedules',
      getSingleRecording: '/livecam/recordings/:id',

      createSchedule: '/livecam/recordings/schedules',
      updateRecording: '/livecam/recordings/:id',
      deleteRecording: '/livecam/recordings/:id',

      downloadRecording: '/livecam/recordings/:id/download',
      streamFeed: '/livecam/stream'
    }
  }
};

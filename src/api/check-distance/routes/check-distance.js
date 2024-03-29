module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/check-distance',
      handler: 'check-distance.handleCheckDistance',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/check-in',
      handler: 'check-distance.handleCheckIn',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/check-last-status',
      handler: 'check-distance.handleLastStatus',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};

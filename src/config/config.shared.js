/**
 * notificationReload: timeout for reloading notifications in seconds
 * permissions: user levels for application
 */

module.exports = {
  notificationReload: 30,
  authorization: {
    clientName: "frontend",
  },
  permissions: {
    UNVERIFIED: 4,
    REGISTERED: 3,
    POWERUSER: 2,
    ADMINISTRATOR: 1,
  },
};

/**
 * Wrapper object for ENV var config values (with defaults)
 * @type {Object}
 */
const Config = {
  serverUrl: process.env.REACT_APP_SERVER_URL || 'http://localhost:3000/graphql',
  subscriptionUrl: process.env.REACT_APP_SUBSCRIPTION_URL || 'ws://localhost:3000/subscriptions',
}

export default Config;
/* routes/index.js */

module.exports = (router) => {
  const prefix = '/v1';
  router.use(`${prefix}/transactions`, require('./transactions'));
  router.use(`${prefix}/balance`, require('./balances'));
};

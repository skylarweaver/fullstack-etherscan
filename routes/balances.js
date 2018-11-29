const Router = require('koa-router');

const router = new Router();
const Ctrl = require('../controllers/balances');

router.get('/', Ctrl.findAll);
router.get('/:address', Ctrl.findBalancesByAddress);

module.exports = router.routes();

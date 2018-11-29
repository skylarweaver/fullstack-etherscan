const Router = require('koa-router');

const router = new Router();
const Ctrl = require('../controllers/transactions');

router.get('/', Ctrl.findAll);
router.get('/:address', Ctrl.findTransactionsByAddress);

module.exports = router.routes();

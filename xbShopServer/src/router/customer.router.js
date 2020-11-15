const Router = require('koa-router');

// const { Resolve } = require('../core/resolve');
const { saveCustomer, getGeoConstants } = require('../controller/customer/customer.controller');

const router = new Router();

router.post('/saveCustomer', saveCustomer);

// curl -d "countryCode=fr" -X POST http://localhost:3000/api/v1/customer/getGeoConstants
router.post('/getGeoConstants', getGeoConstants);

module.exports = router;

const Router = require('koa-router');

const { authMiddleware } = require('./auth.router');
// const { Resolve } = require('../core/resolve');
const {
    saveCustomer,
    getCustomer,
    fetchConstants,
    getGeoAutos,
    saveAddress,
    getAddress,
} = require('../controller/customer/customer.controller');

const router = new Router();

// const authMiddleware = AuthRouter.authMiddleware;
router.post('/saveCustomer', saveCustomer);

// curl -X POST http://localhost:3000/api/v1/customer/getCustomer
// curl -d "idCustomer=10" -X POST http://localhost:3000/api/v1/customer/getCustomer | json_pp
router.post('/getCustomer', /* authMiddleware, */ getCustomer);

// curl -d "countryCode=fr" -X POST http://localhost:3000/api/v1/customer/getGeoConstants
router.post('/fetchConstants', authMiddleware, fetchConstants);

// curl -d "searchStr=pa&type=region&countryCode=fr" -X POST http://localhost:3000/api/v1/customer/getGeoAutos
router.post('/getGeoAutos', /* authMiddleware, */ getGeoAutos);

router.post('/saveAddress', /* authMiddleware */ saveAddress);

// curl -d "customerId=8&addressId=3" -X POST http://localhost:3000/api/v1/customer/getAddress
// curl -d "customerId=8" -X POST http://localhost:3000/api/v1/customer/getAddress
router.post('/getAddress', /* authMiddleware */ getAddress);

module.exports = router;

const router = require('express').Router();
const homeRoutes = require('./test');

router.use('/', homeRoutes);

module.exports = router;

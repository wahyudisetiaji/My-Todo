var express = require('express');
var router = express.Router();
const QoutesController = require('../controllers/qoutes-controller');

/* GET qoutes listing. */
router.get('/', QoutesController.qoutesOfTheDay)

module.exports = router;
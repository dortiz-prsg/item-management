const router            = require('express').Router()
const errorLogger       = require('../middleware/errorLogger.js')
const { requireAuth }   = require('../middleware/auth.js')
router.use('/auth', require('./auth.js'))
router.use('/items', require('./items.js'))

/** error logging */
router.use(errorLogger)

module.exports = router
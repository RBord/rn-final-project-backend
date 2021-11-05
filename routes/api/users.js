const express = require('express')
const {
  userLoginSchema,
  userRegistrySchema,
  userEmailSchema,
} = require('../../joiSchemas')
const {
  controllerWrapper,
  validation,
  authenticate,
} = require('../../middlwares')
const { users: auth } = require('../../controllers')

const router = express.Router()

router.post(
  '/singup',
  validation(userRegistrySchema),
  controllerWrapper(auth.signup)
)

router.get('/verify/:verifyToken', controllerWrapper(auth.verify))

router.post(
  '/verify',
  validation(userEmailSchema),
  controllerWrapper(auth.repeatVerify)
)

router.post(
  '/login',
  validation(userLoginSchema),
  controllerWrapper(auth.signin)
)

router.post('/logout', authenticate, controllerWrapper(auth.signout))

router.get('/current', authenticate, controllerWrapper(auth.currentUser))

module.exports = router

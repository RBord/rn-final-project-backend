const express = require('express')
const {
  userSchema,

  userEmailSchema,
} = require('../../joiSchemas')
const {
  controllerWrapper,
  validation,
  authenticate,
} = require('../../middlwares')
const { users: auth } = require('../../controllers')

const router = express.Router()

// router.post('/singup', validation(userSchema), controllerWrapper(auth.signup))
router.post('/singup', controllerWrapper(auth.signup))

router.get('/verify/:verifyToken', controllerWrapper(auth.verify))

router.post(
  '/verify',
  validation(userEmailSchema),
  controllerWrapper(auth.repeatVerify)
)

router.post('/login', validation(userSchema), controllerWrapper(auth.signin))

router.post('/logout', authenticate, controllerWrapper(auth.signout))

router.get('/current', authenticate, controllerWrapper(auth.currentUser))

module.exports = router

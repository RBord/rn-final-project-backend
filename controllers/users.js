const { Conflict, BadRequest } = require('http-errors')
const jwt = require('jsonwebtoken')
const { User } = require('../model')
const { sendSuccess } = require('../utils')

const signup = async (req, res) => {
  const { name, email, password } = req.body

  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict('Email in use')
  }
  const newUser = new User({ name, email })

  newUser.setPassword(password)

  await newUser.save()

  sendSuccess.users(res, { name, email })
}

const { SECRET_KEY } = process.env

const signin = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email }, '_id name email password  ')
  if (!user || !user.comparePassword(password)) {
    throw new BadRequest('Email or password is wrong')
  }

  const { _id } = user
  const payload = {
    _id,
  }
  const token = jwt.sign(payload, SECRET_KEY)

  await User.findByIdAndUpdate(_id, { token })

  sendSuccess.users(res, { token, email })
}

const signout = async (req, res) => {
  const { _id } = req.user
  await User.findByIdAndUpdate(_id, { token: null })
  res.status(204).json({})
}

const currentUser = async (req, res) => {
  const { email } = req.user
  sendSuccess.users(res, { email })
}
module.exports = {
  signup,
  signin,
  signout,
  currentUser,
}

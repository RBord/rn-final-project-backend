const { Schema, model } = require('mongoose')

const categorySchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Name of category is required'],
      unique: true,
    },
    sign: {
      type: Boolean,
      required: [true, 'Sign of category is required'],
    },
  },
  { versionKey: false, timestamps: true }
)

const Category = model('category', categorySchema)

module.exports = Category

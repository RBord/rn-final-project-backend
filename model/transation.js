const { Schema, SchemaTypes, model } = require('mongoose')

const transactionSchema = Schema(
  {
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
      required: true,
    },
    category: {
      type: SchemaTypes.ObjectId,
      ref: 'category',
      require: true,
    },
    year: {
      type: String,
      default: '',
    },
    month: {
      type: String,
      default: '',
    },
    day: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      maxLength: 30,
    },
    value: {
      type: Number,
      default: 0,
    },
  },
  { versionKey: false, timestamps: true }
)

const Transaction = model('transaction', transactionSchema)

module.exports = Transaction

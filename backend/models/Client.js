const mongoose = require('mongoose')

const clientSchema = mongoose.Schema({
  lastname: { type: String, required: true },
  firstname: { type: String, required: true },
  function: { type: String, required: false },
  phone: { type: String, required: false },
  email: { type: String, required: false },
  society: { type: String, required: true },
  firstAddress: { type: String, required: false },
  secondAddress: { type: String, required: false },
  postalCode: { type: String, required: false },
  city: { type: String, required: false },
  country: { type: String, required: false },
  date: { type: Date, required: true }
})

module.exports = mongoose.model('Client', clientSchema)
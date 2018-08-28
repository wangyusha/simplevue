const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;
const citySchema = new Schema({
  city:Object
},{
  collection:'City'
})

mongoose.model('City',citySchema)

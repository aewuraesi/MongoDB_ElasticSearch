const mongoose = require('mongoose');
const mongoosastic = require('mongoosastic');
const Schema = mongoose.Schema;

const Farmschema = new Schema(
  {
    name: { type: String, required: true, text: true },
    crop: { type: String, required: true, text: true },
    acreage: { type: Number, required: true }
  },
  { versionKey: false, timestamps: true }
);

// connects the mongodDB database to elastic search without having to write a lot of code
Farmschema.plugin(mongoosastic, {
  hosts: ['localhost:9200']
});

module.exports = mongoose.model('Api_Farm', Farmschema);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Farmschema = new Schema(
    {
        name:{ type: String, required: true, text: true },
        crop:{ type: String, required: true, text: true },
        acreage:{ type: Number, required: true}
    },
    { versionKey: false, timestamps: true }
);


module.exports = mongoose.model('Api_Farm', Farmschema);
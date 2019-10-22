const mongoose = require('mongoose');
const assert = require('assert');

const db = mongoose
  .connect(
    process.env.MONGO_URI_LOCAL,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true
    },
    async function(err, database) {
      await database.collection('api_farms', {}, async function(err, coll) {
        if (err != null) {
          await database.createCollection('api_farms', function(err, result) {
            assert.equal(null, err);
          });
        }
        await coll.createIndex({ name: 'text', crop: 'text' }, async function(err, result) {
          console.log(result);
          callback(result);
        });
        await coll.ensureIndex({ name: 'text', crop: 'text' }, function(err, indexname) {
          assert.equal(null, err);
        });
      });
    }
  )
  .then(() => console.log('DB Connected!'))
  .catch(err => {
    console.log(`DB Connection Error: ${err.message}`);
  });

module.exports = db;

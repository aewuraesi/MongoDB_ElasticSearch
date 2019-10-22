const express = require('express');
const router = express.Router();
const FarmController = require('../Controllers/farm');

router.use((req, res, next) => {
  console.log(req.method, req.url);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  next();
});

router.get('/', FarmController.GetFarms).post('/', FarmController.CreateFarm);

router.get('/searcher', FarmController.FullSearchFarm);

router.get('/allsearch', FarmController.SearchFarms);

router
  .get('/:_id', FarmController.GetFarm)
  .put('/:_id', FarmController.UpdateFarm)
  .delete('/:_id', FarmController.DeleteFarm);

module.exports = router;

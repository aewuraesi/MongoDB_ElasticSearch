const express = require('express');
const router = express.Router();
const FarmController = require('../Controllers/farm')

router.get('/', FarmController.GetFarms)
.post('/', FarmController.CreateFarm);
  
router.get('/:_id', FarmController.GetFarm)
.put('/:_id', FarmController.UpdateFarm)
.delete('/:_id', FarmController.DeleteFarm);

router.post('/name', FarmController.FullSearchFarm);

router.post('/searchs', FarmController.SearchFarms);



  module.exports = router;
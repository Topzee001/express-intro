const express = require('express');
const exploreController = require('./../controllers/exploreController');

//router

const router = express.Router();

router.param('id', exploreController.checkID);

router
  .route('/')
  .get(exploreController.getAllExplores)
  .post(exploreController.checkBody, exploreController.createExplore);
router
  .route('/:id')
  .get(exploreController.getExplore)
  .patch(exploreController.updateExplore)
  .delete(exploreController.deleteExplore);

module.exports = router;

const express = require('express');
const router = express.Router();

const exerciseController = require("../controllers/exercise.controller");

router.get('/findall', exerciseController.findAll);
router.get('/findone/:id', exerciseController.findOne);
router.post('/create', exerciseController.create);
router.patch('/update', exerciseController.update);
router.delete('/delete/:id', exerciseController.delete);


module.exports = router; 
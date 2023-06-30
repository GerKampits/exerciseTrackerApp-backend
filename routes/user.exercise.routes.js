const express = require('express');
const router = express.Router();

const userExerciseController = require('../controllers/user.exercise.controller')

router.get('/findall', userExerciseController.findAll);
router.get('/findone/:username', userExerciseController.findOne);
router.post('/create', userExerciseController.create);
router.patch('/update', userExerciseController.update);
router.delete('/delete/:username/:id', userExerciseController.delete)

module.exports = router;
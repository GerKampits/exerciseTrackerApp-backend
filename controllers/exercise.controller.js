const Exercise = require('../models/exercise.model');

exports.findAll = function (req, res) {
  console.log("Find all exercises");

  Exercise.find( (err, results) => {
		if (err) {
			res.json({ status: false, data: err });
		} else {
			res.json({ status: true, data: results });
		}
	});
};

exports.findOne = function (req, res) {
  
  const id = req.params.id;

  console.log("Find exercise with id", id);

  Exercise.findOne({ _id: id }, (err, result) => {
		if (err) {
			res.json({ status: false, data: err });
		} else {
      res.json({ status: true, data: result });
		}
	});
};

exports.create = function (req, res) {
  
  const newExercise = new Exercise ({
    exercise: req.body.exercise,
    duration: req.body.duration,
    description: req.body.description,
    calories: req.body.calories,
    distance: req.body.distance,
    date: req.body.date
  });

  console.log("insert exercise with name:", req.body.exercise);
 
  newExercise.save( (err, result) => {
    if (err) {
			res.json({ status: false, data: err });
		} else {
      res.json({ status: true, data: result });
		}
  });
};


exports.update = function (req, res) {

  const id = req.body._id;

  console.log("Update exercise with id:", id);

  const updatedExercise = {
    exercise: req.body.exercise,
    duration: req.body.duration,
    description: req.body.description,
    calories: req.body.calories,
    distance: req.body.distance,
    date: req.body.date
    
  };

  Exercise.findOneAndUpdate({ _id: id }, updatedExercise, { new: true }, (err, result) => {
		if (err) {
			res.json({ status: false, data: err });
		} else {
			res.json({ status: true, data: result });
		}
	});
};

exports.delete = function (req, res) {

  const id = req.params._id;

  console.log("Delete exercise with id", id);

  Exercise.findOneAndRemove({ _id: id }, (err, result) => {
		if (err) {
      res.json({ status: false, data: err });
    } else {
      res.json({ status: true, data: result });
    }
	}); 
};

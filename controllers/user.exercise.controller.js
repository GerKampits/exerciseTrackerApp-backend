const User = require('../models/user.model');

exports.findAll = function (req, res) {
    console.log("Find all users");
  
    User.find({},{username: 1, products: 1}, (err, results) => {
          if (err) {
              res.json({ status: false, data: err });
          } else {
              res.json({ status: true, data: results });
          }
      });
  };

exports.findOne = function (req, res) {
    const username = req.params.username;
    console.log("Find user with username", username);

    User.findOne({username:username}, {_id:0, username:1, exercises:1}, (err, result)=> {
        if (err) {
            res.json({ status: false, data: err })
        } else {
            res.json ({ status:true, data: result })
        }
    });
}

exports.create = function (req, res) {
    const username = req.body.username;
    const exercises = req.body.exercises;

    console.log("insert exercises to username:", username);

    User.updateOne(
        { username: username },
        {
            $push: {
                exercises: exercises
            }
        },
        (err, result) => {
            if (err) {
                res.json({ status: false, data: err});
            } else {
                res.json({status: true, data: result });
            }
              
        }
         
    )
}

exports.update = function (req, res) {

    const username = req.body.username;      
    const id = req.body.exercises._id; 
    const distance = req.body.exercises.distance;

    User.updateOne(
        {
            username: username,
            "exercises._id": id 
        },
        {
            $set: {
                "exercises.$.distance": distance
            }
        },
        (err, result) => {
            if (err) {
                res.json({ status: false, data: err});
            } else {
                res.json({status: true, data: result });
            }
              
        }
    )
}


exports.delete = function (req, res) {

    const username = req.params.username;  
    const id = req.params._id

    
    User.updateOne(          
        { username: username },
        { 
            $pull: {       
                exercises: { _id: id } }
            },
        (err, result) => {
            if (err) {
                res.json({ status: false, data: err});
            } else {
                res.json({status: true, data: result });
            }
              
        }
    )
}

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const validateEmail = (email) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

let bodyMeasurementsSchema = new Schema({
  height: { type: Number },
  weight: { type: Number }
}, { _id : false });

let phoneSchema = new Schema({
  type: { type: String },
  number: { type: String }
}, { _id : false });

let exerciseSchema = new Schema({
  exercise: { type: String, required: true },
  duration: { type: Number , required: true },
  description: { type: String},
  calories: { type: Number },
  distance: { type: Number , required: true},
  date: { type: String, required: true},
}, {_id : true});

let userSchema = new Schema({
  username: {
    type: String, 
    required: [ true, 'Username is required field' ], 
    max: 100, 
    unique:true,
    trim:true,
		lowercase:true, 
  },
  password: {type: String, required: [true, 'Password is required field'], max: 100},
  name: {type: String, required: [ true, 'Name is required field' ], max: 100},
  surname: {type: String, required: true, max: 100},
  email: {
    type: String, 
    required: [true, 'Email is required field'], 
    max: 100, 
    unique:true,
    trim:true,
		lowercase:true, 
    // validate: [validateEmail, "Please fill a valid email address"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Email address is not valid",
    ],
  },
  bodyMeasurements: bodyMeasurementsSchema,
  phone: { type:[phoneSchema], null: true },
  exercises: { type: [exerciseSchema], null: true  }
},
{ 
  collection: 'users',
  timestamps: true 
});

// Apply the uniqueValidator plugin to userSchema.
userSchema.plugin(uniqueValidator);

// Export the model
module.exports = mongoose.model('User', userSchema);
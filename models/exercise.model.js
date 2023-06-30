const mongoose = require('mongoose');

const Schema = mongoose.Schema

let exerciseSchema = new Schema({
    exercise: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    calories: {
        type: Number
    },
    distance: {
        type: Number,
        required: true
    },
    date : {
        type : String,
        required: true
    }
    
},
{
    collection: 'exercises',
    timestamps: true
}
);

//Export the model
module.exports = mongoose.model('Exercise', exerciseSchema);
const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const mongoose  = require('mongoose');
require("dotenv").config();

const cors= require('cors');
app.use(cors({
    origin: '*'
}))

app.use('/', express.static('files'));

mongoose.set('strictQuery', false);
mongoose.connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true},
    (err)=> {
        if (err) {
            console.log(err);
        } else {
            console.log("Connected to MongoDB");
        }
    }
)

const user = require("./routes/user.routes");
const userExercise = require("./routes/user.exercise.routes");
const exercise = require("./routes/exercise.routes");

//Καλείται ενδιάμεση συνάρτηση
app.use('/api/userexercise', userExercise)
app.use('/api/user', user);
app.use('/api/exercise', exercise);


app.listen(port, ()=> {
    console.log(`Server is listening in port ${port}`);
})
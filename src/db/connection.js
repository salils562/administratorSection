const mongoose = require('mongoose');

mongoose.login=mongoose.createConnection('mongodb://localhost:27017/bhashamamData');
mongoose.words=mongoose.createConnection('mongodb://localhost:27017/wordsmarathon');
mongoose.verbs=mongoose.createConnection('mongodb://localhost:27017/verbs');
module.exports = mongoose;
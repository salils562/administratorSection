const mongoose=require('../../db/connection');

const schema=new mongoose.Schema({
    question:{
        type:String,
        required:true,
        trim: true,
        minlength: 2,
    },
    targetword:{
       type:String,
       required:true,
       trim:true
    },
    options:{
        type:[],
        required:true
    },
    answer:{
        type:String,
        required:true,
        trim: true
    }
});

const VerbExer1=mongoose.verbs.model('exercise1',schema);

module.exports=VerbExer1;
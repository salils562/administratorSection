const conn=require('../../db/connection');
// defining schema
const Schema=new conn.Schema({
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

// defining model
const WordExer1=conn.words.model('exercise1',Schema);
module.exports=WordExer1;
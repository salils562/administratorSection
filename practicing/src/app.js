const { urlencoded } = require('express');
const express=require('express');
const app=express();
const mongoose=require('mongoose');
const path=require('path');
const port=8000;

// defining some paths
const staticPath=path.join(__dirname,"../public");
// definging middlewares
app.set('view engine','hbs');
app.use(express.static(staticPath));
app.use(express.json());
app.use(urlencoded());
// creating connection
mongoose.connect('mongodb://localhost:27017/practicedb').then(()=>{
    console.log("Connection successful");
}).catch((e)=>{
console.log("unable to connect");
});

// defining schema
const Schema=new mongoose.Schema({
    question:{
        ques:{
            type:String,
            required:true
        },
        options:[],
        answer:String
    }
}
);

// defining model
const Questions=new mongoose.model('Question',Schema);

// setting up requests
app.get('/',(req,res)=>{
res.status(200).render('index');
});

app.post('/append',async(req,res)=>{
try{
    const ques=req.body.question;
    const option1=req.body.option1;
    const option2=req.body.option2;
    const option3=req.body.option3;
    const answer=req.body.answer;
    const question=new Questions({
         question:{
             ques:ques,
             options:[option1,option2,option3],
             answer:answer
            } 
    
    });
    const result=await question.save();
    console.log(result);
    res.status(200).render('succss');
}catch(e){
    res.status(400).send("unable to append");
}    
});

app.get('/append',async(req,res)=>{
try {
    const result=await Questions.find();
    res.status(200).send(result);
} catch (error) {
    res.status(400).send("wrong err!");
}
});

app.listen(port,()=>{
console.log(`listening on port http://localhost:${port}`);
});




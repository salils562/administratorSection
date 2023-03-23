const express = require('express');
const hbs = require('hbs');
const app = express();
const path = require('path');
const bcrypt = require('bcrypt');
const port = 8000;
const router=express.Router();

// handling models
const IdPass=require('./models/login');
const WordExer1=require('./models/wordsModel/exercise1');
const VerbExer1=require('./models/verbsModel/exercise1');
// setting paths
const staticPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

// setting express
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);
app.use(express.static(staticPath));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(router);
// handling get requests for pages
router.get('/', (req, res) => {
    res.status(200).render('login', { Validationtext: "" });
});
router.get('/home', (req, res) => {
    res.status(200).render('index');
});
router.get('/word-exer1',(req,res)=>{
res.status(200).render('wordsMarathon/exercise1');
});

// handling rest api
router.get('/word-exer1Data',async(req,res)=>{
try {
    const result=await WordExer1.find();
    res.header("Access-Control-Allow-Origin", "*");
    res.status(200).send(result);
} catch (e) {
    res.status(404).send('unable to fetch data');
}
});
// handling post request
router.post('/login', async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const result = await IdPass.find({ username: username });
        const match = await bcrypt.compare(password, result[0].password);
        if (match) {
            res.status(200).render('index');

        } else {
            res.status(400).render('login', { Validationtext: "Invalid login details! Please try again" });

        }
    } catch (e) {
        res.status(404).send("unable to login");
    }
});
router.post('/word-exer1',async(req,res)=>{
try {
    const options=[`${req.body.option1}`,`${req.body.option2}`,`${req.body.option3}`];
    const Question=new WordExer1({  
         question:req.body.question,
         targetword:req.body.targetword,
         options:options,
         answer:req.body.answer
    });
    const result=await Question.save();
    res.status(200).render('wordsMarathon/exercise1');
} catch (e) {
    res.status(404).send("unable to push data into word exercise 1");
}
});
// handling patch request
router.patch('/word-exer1',async(req,res)=>{
try {
    const {_id,question,targetword,options,answer}=req.body;
    const result=await WordExer1.findByIdAndUpdate({_id:_id.toString()},{$set:{question:question,targetword:targetword,options:options,answer:answer}},{new:true});
    res.status(200).send(result);
} catch (error) {
    res.status(404).send("Error occured");
}
});
// handling delete request
router.delete('/word-exer1',async(req,res)=>{
try {
    const {_id}=req.body;
    const result=await WordExer1.findByIdAndDelete({_id});
    res.status(200).send(result);
} catch (error) {
    res.status(404).send("unable to delete");
}    
});

// listening on port
app.listen(port, '127.0.0.1', () => {
    console.log(`listening on port http://127.0.0.1:${port}`);
});

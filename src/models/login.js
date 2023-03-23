const con=require('../db/connection');

const Schema=new con.Schema({
username:{
    type:String,
    unique:true,
    required:true
},
password:{
    type:String,
    required:true
}
});

const IdPass=con.login.model("idpass",Schema);

module.exports=IdPass;

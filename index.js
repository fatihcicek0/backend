const express=require('express');
const bodyparser=require('body-parser');
const cors =require('cors');
const mysql=require('mysql2');
const app=express();

app.use(cors());
//app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'simpledb',
    port:3306
});

db.connect(err=>{
if(err){    console.log(err);}
  console.log('database connected');
}
);


app.get('/user',(req,res)=>{

         
       let qr ='select * from user';

   db.query(qr,(err,result)=>{
        if(err){
            console.log(err);
        } 
        if(result.length>0){
            res.send({
                message:'all user data',
                data:result
            });
        }
   });
 
});

app.get('/user/:id',(req,res)=>{
        let gID =req.params.id;

        let qr=`select* from user where user.id=${gID}`
        db.query(qr,(err,result)=>{
            if(err){console.log(err);}

            if(result.length>0){
                res.send({
                    message:'get single data',
                    data:result
                });
            }else{
                res.send({
                    message:'data not found'
                });
            }
        });
});

app.post('/user',(req,res)=>{
   //console.log(req.body,'createdata');
  let fullname=req.body.fullname;
  let email=req.body.email;
  let mb=req.body.mobile;

  let qr=`insert into user(fullname,email,mobile) values('${fullname}','${email}','${mb}')`;
     
  db.query(qr,(err,result)=>{
        if(err){console.log(err);};
        res.send({
               message:'data insertedd'
            });
  });
  
});

app.put('/user/:id',(req,res)=>{
   
  let gID=req.params.id;      
  let fullname=req.body.fullname;
  let email=req.body.email;
  let mb=req.body.mobile;

  let qr=`update user set fullname='${fullname}',email='${email}',mobile='${mb}'
  where id=${gID}`;

  db.query(qr,(err,result)=>{
      if(err){console.log(err);};

      res.send({
         message:'data uptaded'
      });
  });


});

app.delete('/user/:id',(req,res)=>{
       let qID=req.params.id;

       let qr=`delete from user where id='${qID}'`;
       db.query(qr,(err,result)=>{
           if(err){console.log(err);};
           res.send({
              message:'data deleted'
           });

       });
});

app.listen(3000,()=>{
    console.log('listening on 3000 port');
})
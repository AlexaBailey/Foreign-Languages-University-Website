const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const session=require("express-session")
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const app = express();

const multer = require('multer');
const path = require( 'path' );
const url = require('url');

const urldecode = require('urldecode')




//uguguygyubuybuyhWSA

const { S3Client } = require('@aws-sdk/client-s3');
    
const multerS3 = require('multer-s3');


let s3 = new S3Client({
  region: 'us-east-1',
  credentials: {
    accessKeyId: 'AKIAVBUPNQ5IN7SE4XUN',
    secretAccessKey: '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'
  },
 
});
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'orionbucket1',
    acl:'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(
        null,
        'englib/' + Date.now().toString() + '-' + file.originalname
      );
    },
  }),
});
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST","DELETE"],
    credentials: true,
  })
);





app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);




const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "alexa",
  database: "englib",
  multipleStatements:true
});

app.post('/login',function(req,res){
    const user_name = req.body.name;

    const user_password = req.body.password;
    console.log(user_password);
    if(user_name && user_password)
    {
        query = `
        SELECT * FROM users
        WHERE username = "${user_name}"
        `;
        
        db.query(query, function(error, data){
          console.log(data)
          
  
            if(data.length > 0)
            {
            
                    if(data[0].password)
                    {
                      console.log(data[0].password, user_password)
                 
                      
                      bcrypt.compare(user_password,data[0].password,function(err,result){
                      if (result){
                       
                        const {password, ...other} = data[0] 
                        const token = jwt.sign(other, 'develop', { expiresIn: "2h" });
                        console.log(token)
                        superid = token.sid
                        res.send(token);
                                      
                      
  
                      }
                     else if (err){
                      console.log("wrong password")
                      return res.sendStatus(401).json(err);
                      
                    
                     
                     }
  
                    });
                  }
                }
                else{
                  return res.status(401).json(error);
                }
            
             
                
              })
            
            }
          })
          
  app.post("/signup", (req, res) => {
    console.log(1)
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email
    var job;
    if (req.body.job=='студент'){
      job=0
    }
    if (req.body.job=='преподаватель'){
      job=1
    }
    console.log(username)
    const fio = req.body.fi


    console.log(password)
    console.log(email)
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        console.log(err);
      }
      db.query(
        "INSERT INTO users (`username`,`email`, `password`,`fio`,`job`) VALUES (?,?,?,?,?)",
        [username, email, hash,fio,job],
        (err, result) => {
          if (err){
            console.log(err)
          }
          else{
            const jwtData = {result};
      const token = jwt.sign(jwtData, 'CODEBLESSYOU', { expiresIn: "2h" });
      res.send(token);
          }
          
        }
      );
    });
   
  });
  
  
app.post('/addbook', upload.single('file'), (req, res, next) => {
  const name = req.body.name  
  const writer = req.body.writer  
  const user = req.body.user     
  const date = req.body.date     

  const spec = req.body.spec
  var link;
  var comments;
  var image;
  const publish = req.body.publish

  if (req.body.comments){
    comments = req.body.comments

  }


  if (req.file){
   image = req.file.location

  }
  else if (req.body.booklink){
    image = req.body.booklink

  }
  else{
    image=''
  }

  
  console.log("data", spec,image,publish,link)


 
  

     
  const q= `insert into books(usersid,writers, btitle,booklink, speciality,publish,writedate, comments) values ('${user}','${writer}','${name}','${image}','${spec}','${publish}','${date}','${comments}')`




db.query(q, (err, data) => {
  if (err) {
    console.log(err);
    return res.json(err)
    ;
  }
  return res.json(data);

});
})

app.post('/addhomework', upload.single('file'), (req, res, next) => {
  const name = req.body.name  
  const writer = req.body.writer  
  const user = req.body.user     
  const publish = req.body.publish
  const teacher = req.body.teacher



  if (req.file){
   image = req.file.location

  }
  else if (req.body.booklink){
    image = req.body.booklink

  }
  else{
    image=''
  }

  
  console.log("data",)


 
  

     
  const q= `insert into homeworks(homename,studentid,homelink, studentname, teacher,publish) values ('${name}','${user}','${image}','${writer}','${teacher}','${publish}')`




db.query(q, (err, data) => {
  if (err) {
    console.log(err);
    return res.json(err)
    ;
  }
  return res.json(data);

});
})




app.post('/addnews', upload.single('file'), (req, res, next) => {
  const name = req.body.name  





  var image;
  const publish = req.body.publish

var comments = req.body.comments

 

  if (req.file){
   image = req.file.location

  }
  else{
    image=''
  }

  
  console.log("data")


 
  

     
  const q= `insert into news(ntitle,nlink,newspublish,comments) values ('${name}','${image}','${publish}','${comments}')`




db.query(q, (err, data) => {
  if (err) {
    console.log(err);
    return res.json(err)
    ;
  }
  return res.json(data);

});
})

app.post('/editbook/:bookid', upload.single('file'), (req, res, next) => {
    const bookid=req.params.bookid
    const name = req.body.name  
    const writer = req.body.writer  
    const user = req.body.user     
    const date = req.body.date     
  
    const spec = req.body.spec
    var link;
    var comments;
    if (req.body.comments){
      comments=req.body.comments
    }
    var image;
    const publish = req.body.publish
  
  
  console.log("data",name,writer,user, spec,publish)


 
  

     
  var q= `update  books set usersid='${user}',writers='${writer}', btitle='${name}', speciality='${spec}',publish='${publish}',writedate='${date}' , comments='${comments}'`


  if (req.file){
    image = req.file.location
    q+=`, booklink= '${image}'`
 
   }
   else if (req.body.linki){
     image = req.body.linki
     q+=`, booklink= '${image}'`

 
   }
   q+=` where bid=${bookid}`
console.log(q)


db.query(q, (err, data) => {
  if (err) {
    console.log(err);
    return res.json(err)
    ;
  }
  return res.json(data);

});
})
app.get('/likes/:id/:userid', (req, res, next) => {  
  const id = req.params.id
  const userid = req.params.userid
  var q;
   q=`Select count(cid) as num  from chosen where bookid =${id} `
    console.log(q)
    db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err)
      ;
    }
   
      return res.json(data);

 
  
   
  
  });
  })
  app.post('/liked/:id/:userid/:writerid', (req, res, next) => {  
    const id = req.params.id
    const userid = req.params.userid
    const writerid = req.params.writerid

 
    console.log(id,userid)
    var q;
    
   q=`Insert into chosen ( uid,bookid,profid) values (${userid}, ${id},${writerid})`


          


 


    console.log(q)
  
    
      db.query(q, (err, data) => {
      if (err) {
        console.log(err);
        return res.json(err)
        ;
      }
    
      return res.json(data);
    
    });
    })
    
  app.post('/disliked/:id/:userid', (req, res, next) => {  
    const id = req.params.id
    const userid = req.params.userid
    console.log(id,userid)
    var q;
    


          
   q=`delete from chosen where bookid=${id} and uid=${userid}`


 


    console.log(q)
  
    
      db.query(q, (err, data) => {
      if (err) {
        console.log(err);
        return res.json(err)
        ;
      }
    
      return res.json(data);
    
    });
    })
 
app.get('/books/:id', (req, res, next) => { 
  const id=req.params.id 
var q;
 q=`Select * from books;select * from books,  users, chosen where uid=users.id and bookid=bid and uid=${id};`

  db.query(q, (err, data) => {
  if (err) {
    console.log(err);
    return res.json(err)
    ;
  }

  return res.json(data);

});
})

app.get('/homework/:id', (req, res, next) => { 
  const id=req.params.id 
var q;
 q=`select * from homeworks,  users where studentid=users.id and studentid=${id};`

  db.query(q, (err, data) => {
  if (err) {
    console.log(err);
    return res.json(err)
    ;
  }

  return res.json(data);

});
})

app.get('/allhomeworks/:fio', (req, res, next) => { 
  const fio=req.params.fio 
var q;
 q=`select * from homeworks,  users where teacher=users.fio and teacher="${fio}" 
 `

  db.query(q, (err, data) => {
  if (err) {
    console.log(err);
    return res.json(err)
    ;
  }

  return res.json(data);

});
})

app.post('/searchall/:fio', (req, res, next) => { 
  const fio=req.params.fio 
  const name=req.body.name
var q;
 q=`select * from homeworks,  users where teacher=users.fio and teacher="${fio}" 
 `
 if (name){
  q+=` and homename='${name}'`
 }

  db.query(q, (err, data) => {
  if (err) {
    console.log(err);
    return res.json(err)
    ;
  }

  return res.json(data);

});
})
app.delete('/homework/:hid', (req, res, next) => { 
  const id=req.params.hid 
var q;
 q=`delete from homeworks where hid=${id};`

  db.query(q, (err, data) => {
  if (err) {
    console.log(err);
    return res.json(err)
    ;
  }

  return res.json(data);

});
})
app.post('/check/:hid', (req, res, next) => { 
  const hid=req.params.hid 
  const mark=req.body.mark
  const credit=req.body.credit
var q;
 q=` update homeworks set credit='${credit}', mark=${mark}, checked=true where hid=${hid}`

  db.query(q, (err, data) => {
  if (err) {
    console.log(err);
    return res.json(err)
    ;
  }

  return res.json(data);

});
})


app.post('/searchhomework/:id', (req, res, next) => { 
  const id=req.params.id 
  const name=req.body.name
  console.log(id,name)
var q;

 q=`select * from homeworks,  users where studentid=users.id and studentid=${id}`
if (name){
  q+=` and homename='${name}'  `
}
  db.query(q, (err, data) => {
  if (err) {
    console.log(err);
    return res.json(err)
    ;
  }

  return res.json(data);

});
})


app.get('/chosen/:id', (req, res, next) => { 
  const id=req.params.id 
var q;
 q=`select * from books,  users, chosen where uid=users.id and bookid=bid and uid=${id};`

  db.query(q, (err, data) => {
  if (err) {
    console.log(err);
    return res.json(err)
    ;
  }

  return res.json(data);

});
})

app.post('/search/:id', (req, res, next) => { 
  const id=req.params.id 
  const name=req.body.name
var q;
 q=`select * from books,  users, chosen where uid=users.id and bookid=bid and uid=${id}`
  if (name){
    q+=` and btitle='${name}'`
  }
  db.query(q, (err, data) => {
  if (err) {
    console.log(err);
    return res.json(err)
    ;
  }

  return res.json(data);

});
})


  
  app.get('/news', (req, res, next) => {  
    var q;
     q=`select * from news`
    
      db.query(q, (err, data) => {
      if (err) {
        console.log(err);
        return res.json(err)
        ;
      }
    
      return res.json(data);
    
    });
    })
  
app.get('/edit/:bookid', (req, res, next) => {  
  console.log("params",req.params)
  const bookid=(req.params.bookid)
  var q;
   q=`select * from books where bid=${bookid}`
   console.log(q)
  
    db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err)
      ;
    }
  
    return res.json(data[0]);
  
  });
  })
app.post('/repository', (req, res, next) => {  

  const spec=req.body.spec
  
  
  var q=`Select * from books `
  if (spec){
    q+=` where speciality='${spec}'`
  }
  
  q+=`;select * from books,  users, chosen where uid=users.id and bookid=bid `
  if (spec){
    q+=` and speciality='${spec}'`
  }


  db.query(q, (err, data) => {
  if (err) {
    console.log(err);
    return res.json(err)
    ;
  }

  return res.json(data);

});
})

app.post('/books', (req, res, next) => {  

  const name=req.body.name
  
  
  var q=`Select * from books `
  if (name){
    q+=` where btitle='${name}'`
  }
  
  q+=`;select * from books,  users, chosen where uid=users.id and bookid=bid  `
  if (name){
    q+=` and btitle='${name}'`
  }


  db.query(q, (err, data) => {
  if (err) {
    console.log(err);
    return res.json(err)
    ;
  }

  return res.json(data);

});
})
app.delete('/books/:bid', (req, res, next) => {  
  console.log(1)
  const bookid=req.params.bid
  
  var q =`delete from books where bid=${bookid}`
  console.log(q)
  db.query(q, (err, data) => {
  if (err) {
    console.log(err);
    return res.json(err)
    ;
  }

  return res.json(data);

});
})

app.get("/profile/details/:id", (req, res) => {
  const id = req.params.id
  console.log(id)

  const q = `SELECT * from users where id = ${id}`;
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    console.log(data)
    return res.json(data);
  });
});

app.post("/profile/:userid", (req, res) => {
  const id = req.params.userid

  const fio=req.body.fio

  const username=req.body.username


  const email=req.body.email
  const bio=req.body.bio



  console.log(id)

  var q = `update users set`;
 const conditionsArr = []; 
 if (email){
  conditionsArr.push(  ` email='${email}'`);
 }

 
 if (fio){
    conditionsArr.push(  ` fio='${fio}'`);


 }
 if(username){
      conditionsArr.push(  ` username='${username}'`);


 }
 if (bio){
      conditionsArr.push(  ` bio='${bio}'`);


 }
 
q += conditionsArr.join(', '); 

q += ` WHERE id = ${id}`;
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    console.log(data)
    return res.json(data);
  });
});
  app.listen(8800, () => {
    console.log("running server");
  });
 
  
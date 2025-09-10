const bodyParser = require('body-parser');
require('dotenv').config();
let express = require('express');
let app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());



app.get('/', function(req, res) {
        absolutePath = __dirname + '//views//index.html';
        res.sendFile(absolutePath);
      }
);

absPath=__dirname + '/public';
app.use('/public', express.static(absPath));

app.use(function (req, res, next) {
    console.log(req.method + " " + req.path + " - " + req.ip);
    next();
  });

app.get('/json', (req,res)=>{
    let message= "Hello json";
    if(process.env.MESSAGE_STYLE=="uppercase"){
        message=message.toUpperCase();
    }
    res.json({message:message});
});

app.get('/now', function(req, res, next){
    req.time=new Date().toString();
    next();
}, function(req,res){
    res.json({time:req.time});
});

app.get('/:word/echo', function(req,res){
    res.json({echo:req.params.word});
});

app.route('/name')
.get(function(req,res){
    const first=req.query.first;
    const last=req.query.last;
    res.json({name: `${first} ${last}`});
})
.post(function(req,res){
    const first= req.body.first;
    const last= req.body.last;
    res.json({ name: `${first} ${last}` });
});

mongoose.connect("mongodb+srv://Khushi:<db_password>@cluster0.wauudvm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", { useNewUrlParser: true, useUnifiedTopology: true });






























 module.exports = app;

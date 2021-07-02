const express = require('express');
const app = express();
const MongoClient = require('mongodb');
let db;
const port = 4100;
const uri = "mongodb+srv://AlejandroT:abc@cluster0.wgieu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

app.use(express.json());

var ObjectId = require('mongodb').ObjectID;

MongoClient.connect(uri, {useUnifiedTopology:true}, function(err,client){
    console.log("connected to mongodb succsefully ");
    db = client.db("MongoDb");
})
app.listen(port, function(req,res){
    console.log("Listening to port " + port);
})
app.get('/addHtml', function(req,res){
    res.sendFile(__dirname + "/index.html");
})
app.get('/getBlog', function(req,res){
    db.collection('blogs').find({}).toArray(function(error,documents){
        if(error) throw error;
        for(let counter = 0; counter < documents.length; counter++){
            res.write("Name:" + documents[counter].name + " Age: " + documents[counter].age + '\n');
        }
        res.end();
    })
})
app.post('/customBlogs', function(req,res){
    db.collection('blogs').insertOne({
        name: req.body.string,
        age: req.body.number
    }, function(err,results){
      if(err) throw error;
      res.send("Blog added successfully");
    })
})
app.post('/findBlogByID', function(req,res){
    db.collection('blogs').findOne({
        _id: req.body._id
    })
    db.collection('blogs').find({"_id" : ObjectId(req.body._id)}).toArray( function(error, documents){
    if (error) throw error;
    console.log(documents)
    res.send(documents)
    })
})


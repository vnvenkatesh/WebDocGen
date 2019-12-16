//
// const MongoClient = require('mongodb').MongoClient;
// const bodyParser = require('body-parser');
// const cors = require('cors');
//
// module.exports = function(app, db) {
//
//     app.use(cors());
//
//     //FOR TESTING
//     app.get('/',(req,res)=>{res.send("Hello Sayan")});
//
//     //Application Id based Document
//     app.get('/application/:AppId',(req,res)=>{
//         console.log(req.params.AppId);
//         var query = { ApplicationId: req.params.AppId };
//         MongoClient.connect("mongodb://localhost:27017/CCM", function (err, db) {
//             db.collection('Document', function (err, collection) {
//                 collection.find(query).limit(1).toArray(function(err, items) {
//                     if(err) {
//                         res.send({ 'error': 'An error has occurred' });
//                         throw err;
//                     }
//                 console.log(items);
//                 res.send(items);
//                 });
//             });
//             db.close();
//         });
//     });
//
//     //Document Id based Entry
//     app.get('/document/:DocId',(req,res)=>{
//         console.log(req.params.AppId);
//         var query = { DocumentId: { $all: [ req.params.DocId ] }};
//         MongoClient.connect("mongodb://localhost:27017/CCM", function (err, db) {
//             db.collection('Document', function (err, collection) {
//                 collection.find(query).toArray(function(err, items) {
//                     if(err) {
//                         res.send({ 'error': 'An error has occurred' });
//                         throw err;
//                     }
//                 console.log(items);
//                 res.send(items);
//                 });
//             });
//             db.close();
//         });
//     });
//
//     //For entering new Application
//     app.post('/newApplication',(req,res)=>{
//       const App = {
//     		ApplicationId: req.body.ApplicationId,
//     		DocumentId: req.body.DocumentId,
//     		Description: req.body.Description,
//     		AdminSystem: req.body.AdminSystem,
//     		CCMEngine: 	req.body.CCMEngine,
//     		CCMVersion: req.body.CCMVersion,
//     		OPTFile: req.body.OPTFile
//       };
//     	db.collection('Document').insert(App,(err,result)=>{
//         if (err) {
//           res.send({ 'error': 'An error has occurred' });
//     			}
//     		else{
//     			res.send(result.ops[0]);
//     			}
//     	});
//     });
//
//     //Get ApplicationId and associated DocumentId
//     app.get('/document',(req,res)=>{
//         var query = {ApplicationId:/^[A-Z][a-z]*/,DocumentId:/^[A-Z][a-z]*/};
//         var projection = {ApplicationId:1,DocumentId:1,_id:0};
//         MongoClient.connect("mongodb://localhost:27017/CCM", function (err, db) {
//             db.collection('Document', function (err, collection) {
//                 collection.find(query,projection)
//                 .toArray(function(err, items) {
//                     if(err) {
//                         res.send({ 'error': 'An error has occurred' });
//                         throw err;
//                     }
//                 //console.log(items);
//                 res.send(items);
//                 });
//             });
//             db.close();
//         });
//     });
//
//
//
//     //add more route
//
// };
const express = require('express');
const routing = express.Router();
const service = require("../services/record");

routing.get("/setupDB", (req, res, next) => {
    service.insert().then((data) => {
        if (data) {
            res.status(201)
            res.json({ message: "Inserted " + data + " document in database" })
        }
    })
})


routing.get('/application/:applicationId', (req, res, next) => {
    let applicationId = req.params.applicationId;
    service.getDoc(applicationId).then((details) => {
        res.status(200)
        res.json(details)
    }).catch((err) => {
        next(err)
    })
})


routing.get('/document', (req, res, next) => {
    service.getAppDoc().then((details) => {
        res.status(200)
        res.json(details)
    }).catch((err) => {
        next(err)
    })
})

module.exports = routing;

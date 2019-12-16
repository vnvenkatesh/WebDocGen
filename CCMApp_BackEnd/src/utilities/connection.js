const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true)
const schema = {
    //Create the schema according to the requirement mentioned below   
    "ApplicationId": {
        required: [true, 'Required field'],
        type: String
    },
    "DocumentId": {
        required: [true, 'Required field'],
        type: Array
    },
    "Description": {
        type: String
    },
    "AdminSstem": {
        required: [true, 'Required field'],
        type: String,
    },
     "CCMEngine": {
        required: [true, 'Required field'],
        type: String
    },
    "CCMVersion": {
        required: [true, 'Required field'],
        type: Number
    }, 
    "OPTFile": {
        // required: [true, 'Required field'],
        type: String
    },                                
}
let ccmSchema = mongoose.Schema(schema, { collection: 'Document', timestamps: true });

let connection = {  }
connection.getCollection = () => {
    return mongoose.connect('mongodb://localhost:27017/CCM', {  useUnifiedTopology: true,useNewUrlParser: true })
        .then((database) => {
            return database.model("Document", ccmSchema)
        }).catch((error) => {
            let err = new Error("Could not connect to Database")
            err.status = 500;
            throw err;
        })
}

module.exports = connection;

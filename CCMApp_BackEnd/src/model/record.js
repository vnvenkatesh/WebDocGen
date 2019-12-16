
const collection = require('../utilities/connection')
const initialData = require('./data.json');


let model = {}

model.insert = () => {
    return collection.getCollection().then((collection) => {
        return collection.deleteMany().then((data) => {
            return collection.insertMany(initialData).then((response) => {
                if (response && response.length > 0) {
                    console.log("Inserted data:",initialData)
                    return response.length
                } else {
                    let err = new Error("Insertion failed")
                    err.status = 500
                    throw new Error
                }
            })
        })
    })
}


model.getAppDoc = () => {
  var query = {ApplicationId:/^[A-Z][a-z]*/,DocumentId:/^[A-Z][a-z]*/};
  var projection = {ApplicationId:1,DocumentId:1,_id:0};
  return collection.getCollection().then((collection) => {
      return collection.find( query , projection)
          .then((data) => {
              console.log(data)
              return data
          })
  })
}

model.getDoc = (applicationId) => {
    return collection.getCollection().then((collection) => {
        return collection.find({ ApplicationId: applicationId })
            .then((data) => {
                console.log(data)
                return data
            })
    })
}


module.exports = model;

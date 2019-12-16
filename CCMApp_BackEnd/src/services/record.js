
const db=require('../model/record');

let service={}

service.insert = () => {
    return db.insert().then((data) => {
        return data
    })
}

service.getDoc=(applicationId)=>{
    return db.getDoc(applicationId).then((data)=>{
        if(data.length > 0) {
            return data;
        }
        else{
            let err=new Error("Application Id doesnot exist!!")
            err.status=400;
            throw err;
        }
    })
}

service.getAppDoc=()=>{
    return db.getAppDoc().then((data)=>{
        if(data.length > 0) {
            return data;
        }
        else{
            let err=new Error("Application Id OR Document Id doesnot exist!!")
            err.status=400;
            throw err;
        }
    })
}

module.exports = service

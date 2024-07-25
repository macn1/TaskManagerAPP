const mongoose = require('mongoose')

const connectDb = ()=>{

    mongoose.connect(process.env.CONN_STR).then(()=>{
        console.log("db connectedd successfully");
    }).catch((err)=>{
        console.log(err+'db connection failed');

    })
}

module.exports = connectDb
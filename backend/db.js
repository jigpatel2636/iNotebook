const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/inotebook"

const connectToMongo = async() => {
    mongoose.connect(mongoURI, ()=> {
        console.log("connected to Mongo Successfully")
    })
}

module.exports = connectToMongo
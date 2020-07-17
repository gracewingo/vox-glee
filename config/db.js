const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb+srv://gracewingo:newuser09@cluster0.rajok.mongodb.net/concertads-configs?retryWrites=true&w=majority", { useUnifiedTopology: true, useFindAndModify: true, useNewUrlParser: true })
        console.log('mongoDB connected!');

    } catch(err){
        console.error(err)
        process.exit(1)
    }
}

module.exports = connectDB;

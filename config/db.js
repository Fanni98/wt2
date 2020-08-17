const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

/*const connectDB = async () => {
  try {
    
    await mongoose.connect(
      db,
      {
        useNewUrlParser: true

      },
      
      
    );

    console.log('MongoDB is Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};*/

const connectDB = async() => mongoose.connect(db, function(err, db){
  if(err) throw err;
  mysort = {userName : 1};
  db.collection("todos").find().sort(mysort).toArray(function(err, result){
    if (err) throw err;
    console.log('MongoDB is Connected...');
    //console.log(result);
    
  
  
   
  });
}) 


module.exports = connectDB;
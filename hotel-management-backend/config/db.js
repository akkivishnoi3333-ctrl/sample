// const mongoose = require("mongoose");
// const db_url = "mongodb://localhost:27017/hotel-management";
// const connectDB = async(req, res)=>{
//     try{
//         await mongoose.connect(db_url, {})
//         console.log("MongoDB connected...")
//     }catch(err){
//         console.log(err)
//     }
// }
// module.exports = connectDB;
 const mongoose = require("mongoose")
 const mongo_URL = "mongodb://localhost:27017/hotelmanagementDB";
 const connection = mongoose.connect(mongo_URL, {})
 if (connection) {
     console.log("database is connected")
 } else {
     console.log("database is  not connected")
 }
 module.exports = connection;
// const mongoose = require("mongoose");

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI,
//       {  useNewUrlParser: true,
//          useUnifiedTopology: true}
//     );
//     console.log("MongoDB connected...");
//   } catch (err) {
//     console.error(err.message);
//     process.exit(1);
//   }
// };

//module.exports = connectDB;
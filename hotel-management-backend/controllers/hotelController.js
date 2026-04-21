const hotelSchema = require("../models/hotel")
const multer = require("multer")
const path = require("path")
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "./upload")
    },
    filename: (req, file, cb)=>{
        cb(null, file.fieldname+"-"+Date.now()+"-"+Math.round(Math.random()*1E9)+path.extname(file.originalname))
    }
})
const fileFilter = async(req, file, cb)=>{
    if(file.mimetype=="image/jpeg" || 
        file.mimetype=="image/jpg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/webp" ||
file.mimetype === "text/html"){
        cb(null, true)
    }else{
        cb(new Error("file  should be jpg"), null)
    }
}
const upload = multer({storage: storage, fileFilter: fileFilter}).single("hotelImage")
const hotel = {};
 hotel.addHotel = async(req, res)=>{
   upload(req, res, async(err)=>{
    if(err){
         console.log(err)
        res.status(400).json({
            message: err.message
        })
    }else{
           try{
         const data = req.body;
         if(req.file){
            data.hotelImage = req.file.path
         }
         const hotel = await hotelSchema.create(data);
         if(hotel){
             res.status(201).json({
            message: "hotel created",
            data:hotel
        })
         }else{
             res.status(400).json({
            message: "hotel didn't create"
        })
         }
    }catch(err){
        console.log(err)
        res.status(400).json({
            message: err.message
        })
    }
    }
   })
 
}

 hotel.getHotels = async(req, res)=>{
    try{
        const hotels = await hotelSchema.find();
        if(!hotels){
         res.status(404).json({
            message: "hotels not found"
        })}
        res.status(200).json({
            message: "hotels found found",
             hotels
        })
    }catch(err){
          console.log(err)
        res.status(400).json({
            message: err.message
        })
    }
}
//grt hotel by id

 hotel.getHotel = async(req, res)=>{
    try{
        const hotel = await hotelSchema.findById({_id: req.params.hotelId});
        if(!hotel){
         res.status(404).json({
            message: "hotel not found"
        })}
      res.status(200).json({
            message: "hotel found",
            hotel
        })
    }catch(err){
          console.log(err)
        res.status(400).json({
            message: err.message
        })
    }
}

module.exports = hotel;
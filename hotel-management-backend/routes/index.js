var express = require('express');
var router = express.Router();
var userController = require("../controllers/userController")
var bookingController = require("../controllers/bookingController")
var hotelController = require("../controllers/hotelController")
const verifyToken = require("../middleware/auth/auth")
var group = require("express-group-routes")
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


//user routes

router.group("/api/auth", (router)=>{
  router.post("/register", userController.register);
  router.post("/login", userController.login);
})

 //hotel routes
 router.group("/api", (router)=>{
   router.post("/addHotel", hotelController.addHotel);
   router.get("/getHotels", hotelController.getHotels);
   router.get("/getHotel/:hotelId", hotelController.getHotel);
 })
 //booking routes
 router.group("/api", (router)=>{
   router.post("/createBooking", verifyToken, bookingController.createBooking);
   router.put("/cancleBooking/:id" , bookingController.cancleBooking);
   router.put("/checkout/:id" , bookingController.checkout);
   router.get("/getUserBooking", verifyToken, bookingController.getUserBooking); 
   router.get("/getAllBookings", bookingController.getAllBookings); 
 })
module.exports = router;

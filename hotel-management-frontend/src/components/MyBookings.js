// import React, { useEffect, useState } from "react";
// import API from "../utils/api";
// export default function MyBookings() {
//   const [bookings, setBookings] = useState([]);
//  // const userId = localStorage.getItem("userId");
  
//   useEffect(() => {
//     const fetchBookings = async () => {
//       const { data } = await API.get(`/getUserBooking`);
//       setBookings(data.booking);
//     };
//     fetchBookings();
//   }, []);

//   const cancelBooking = async (id) => {
//     await API.delete(`/cancleBooking/${id}`);
//     setBookings(bookings.filter((b) => b._id !== id));
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>My Bookings</h2>
//       {bookings.map((b) => (
//         <div key={b._id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
//           <h3>{b.hotelId.name}</h3>
//           <p>{b.hotelId.location}</p>
//           <p>Check-In: {b.checkIn} | Check-Out: {b.checkOut}</p>
//           <button onClick={() => cancelBooking(b._id)}>Cancel Booking</button>
//         </div>
//       ))}
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import API from "../utils/api";
import { FaCalendarAlt, FaMapMarkerAlt, FaUser, FaRupeeSign } from "react-icons/fa";
import "../App.css";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState("COMPLETED");

  useEffect(() => {
  const fetchBookings = async () => {
    try {
      const { data } = await API.get("/getUserBooking");
      console.log(data); // check shape
      setBookings(data.booking || data.bookings || []); // safe fallback
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };
  fetchBookings();
}, []);

  const filteredBookings = Array.isArray(bookings)
  ? bookings.filter(b => activeTab === "UPCOMING" ? true : b.status === activeTab)
  : [];

     const cancelBooking = async (id) => {
     await API.put(`/cancleBooking/${id}`);
     setBookings(bookings.filter((b) => b._id !== id));
   };
  return (
    <div className="my-bookings-page">
      <div className="tabs">
        {["UPCOMING", "COMPLETED", "CANCELLED", "ALL"].map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bookings-list">
        {filteredBookings.map((booking) => (
          <div key={booking._id} className="booking-card">
            <div className="booking-date">
              <FaCalendarAlt />{" "}
              {new Date(booking.checkIn).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </div>
            <h3>{booking.hotelId.name}</h3>
            <p className="hotel-location">
              <FaMapMarkerAlt /> {booking.hotelId.location}
            </p>
            <p>
              <FaCalendarAlt /> {booking.checkIn} → {booking.checkOut}
            </p>
            <p>
              <FaUser /> Guests: {booking.guests}
            </p>
            <p className="price">
              <FaRupeeSign /> {booking.hotelId.pricePerNight}
            </p>
            <div className="actions">
              <button className="secondary-btn">Book Again</button>
              <button className="secondary-btn" onClick={() => cancelBooking(booking._id)}>Cancel Booking</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

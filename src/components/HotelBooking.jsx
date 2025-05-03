import React, { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import { motion } from "framer-motion";

const guestsOptions = [
  { label: "1 Guest", value: 1 },
  { label: "2 Guests", value: 2 },
  { label: "3 Guests", value: 3 },
  { label: "4+ Guests", value: 4 },
];

const mockHotels = [
  { name: "Grand Paris Hotel", location: "Paris", price: "$120/night" },
  { name: "Beachside Resort", location: "Goa", price: "$150/night" },
  { name: "Mountain View Inn", location: "Manali", price: "$100/night" },
];

const HotelBooking = () => {
  const toast = useRef(null);
  const [hotels, setHotels] = useState([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      location: "",
      checkIn: null,
      checkOut: null,
      guests: null,
    },
  });

  const onSubmit = (data) => {
    const results = mockHotels.filter((hotel) =>
      hotel.location.toLowerCase().includes(data.location.toLowerCase())
    );
    setHotels(results);

    toast.current.show({
      severity: results.length > 0 ? "success" : "info",
      summary: "Search Complete",
      detail: results.length > 0 ? "Hotels found!" : "No hotels found.",
    });
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 overflow-hidden px-4">

      {/* Animated Background */}
      <motion.div 
              animate={{ x: [0, 80, 0], y: [0, 40, 0], opacity: [0.3, 0.6, 0.3] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="absolute w-52 h-52 md:w-72 md:h-72 bg-blue-200 rounded-full opacity-30 top-10 left-10 blur-2xl"
            />
            <motion.div 
              animate={{ x: [-80, 50, -80], y: [-40, 0, -40], opacity: [0.3, 0.6, 0.3] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="absolute w-56 h-56 md:w-80 md:h-80 bg-pink-100 rounded-full opacity-30 bottom-10 right-10 blur-2xl"
            />

      {/* Main Card with Form */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.02, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
        className="w-full max-w-3xl p-6 sm:p-10 bg-white rounded-2xl shadow-2xl backdrop-blur-lg bg-opacity-90 z-10"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Hotel Booking</h1>
        <Toast ref={toast} />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Location */}
          <div>
            <label className="block font-medium mb-1 text-gray-700">Enter Destination</label>
            <Controller
              name="location"
              control={control}
              rules={{ required: "Destination is required" }}
              render={({ field }) => (
                <InputText
                  {...field}
                  placeholder="E.g., Paris, Goa"
                  className={`w-full p-3 rounded-lg shadow-sm border ${errors.location ? "border-red-500" : "border-gray-300"}`}
                />
              )}
            />
            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
          </div>

          {/* Check-in */}
          <div>
            <label className="block font-medium mb-1 text-gray-700">Check-in Date</label>
            <Controller
              name="checkIn"
              control={control}
              rules={{ required: "Check-in date is required" }}
              render={({ field }) => (
                <Calendar
                  {...field}
                  showIcon
                  className={`w-full p-2 rounded-lg shadow-sm border ${errors.checkIn ? "border-red-500" : "border-gray-300"}`}
                />
              )}
            />
            {errors.checkIn && <p className="text-red-500 text-sm mt-1">{errors.checkIn.message}</p>}
          </div>

          {/* Check-out */}
          <div>
            <label className="block font-medium mb-1 text-gray-700">Check-out Date</label>
            <Controller
              name="checkOut"
              control={control}
              rules={{ required: "Check-out date is required" }}
              render={({ field }) => (
                <Calendar
                  {...field}
                  showIcon
                  className={`w-full p-2 rounded-lg shadow-sm border ${errors.checkOut ? "border-red-500" : "border-gray-300"}`}
                />
              )}
            />
            {errors.checkOut && <p className="text-red-500 text-sm mt-1">{errors.checkOut.message}</p>}
          </div>

          {/* Guests */}
          <div>
            <label className="block font-medium mb-1 text-gray-700">Number of Guests</label>
            <Controller
              name="guests"
              control={control}
              rules={{ required: "Please select number of guests" }}
              render={({ field }) => (
                <Dropdown
                  {...field}
                  options={guestsOptions}
                  placeholder="Select guests"
                  className={`w-full p-2 rounded-lg shadow-sm border ${errors.guests ? "border-red-500" : "border-gray-300"}`}
                />
              )}
            />
            {errors.guests && <p className="text-red-500 text-sm mt-1">{errors.guests.message}</p>}
          </div>

          <Button
            type="submit"
            label="Search Hotels"
            icon="pi pi-search"
            className="w-full mt-4 bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 transition duration-300"
          />
        </form>

        {/* Hotel Results */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Available Hotels</h2>
          {hotels.length > 0 ? (
            hotels.map((hotel, index) => (
              <Card key={index} className="mb-4 p-5 rounded-xl shadow-md bg-white">
                <h3 className="text-lg font-bold">{hotel.name}</h3>
                <p className="text-gray-700"><strong>Location:</strong> {hotel.location}</p>
                <p className="text-gray-700"><strong>Price:</strong> {hotel.price}</p>
                <Button label="Book Now" icon="pi pi-check" className="w-full mt-3 bg-yellow-500 text-white hover:bg-yellow-600" />
              </Card>
            ))
          ) : (
            <p className="text-gray-600 text-center">No hotels found. Try another search.</p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default HotelBooking;

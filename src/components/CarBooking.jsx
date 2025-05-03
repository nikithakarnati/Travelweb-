import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { motion } from "framer-motion";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const locations = [
  { name: "Paris", code: "PAR" },
  { name: "New York", code: "NYC" },
  { name: "Tokyo", code: "TOK" },
  { name: "London", code: "LDN" },
];

const carTypes = [
  { name: "Economy", code: "ECO" },
  { name: "SUV", code: "SUV" },
  { name: "Luxury", code: "LUX" },
  { name: "Electric", code: "ELE" },
];

const CarBooking = () => {
  const [confirmation, setConfirmation] = useState(null);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      pickupLocation: null,
      carType: null,
      pickupDate: null,
      dropoffDate: null,
    },
  });

  const onSubmit = (data) => {
    setConfirmation({
      location: data.pickupLocation.name,
      car: data.carType.name,
      pickup: data.pickupDate.toDateString(),
      dropoff: data.dropoffDate.toDateString(),
    });
    reset();
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 overflow-hidden px-4">
      {/* Animated Circles */}
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

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.5, ease: "easeOut" }}
        whileHover={{ scale: 1.03, boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.1)" }} 
        className="p-8 md:p-10 bg-white shadow-lg rounded-2xl w-full max-w-[380px] md:max-w-[450px] lg:max-w-[500px] backdrop-blur-lg bg-opacity-90"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-700">Car Booking</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 md:space-y-6">
          {/* Pickup Location */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.4 }}>
            <label className="block text-sm font-medium text-gray-600 mb-1">Pickup Location</label>
            <Controller
              name="pickupLocation"
              control={control}
              rules={{ required: "Pickup location is required" }}
              render={({ field }) => (
                <Dropdown
                  {...field}
                  options={locations}
                  optionLabel="name"
                  placeholder="Select a location"
                  className={`w-full p-inputtext-sm md:p-inputtext-md ${errors.pickupLocation ? "p-invalid" : ""}`}
                />
              )}
            />
            {errors.pickupLocation && <p className="text-red-400 text-sm mt-1">{errors.pickupLocation.message}</p>}
          </motion.div>

          {/* Car Type */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.4 }}>
            <label className="block text-sm font-medium text-gray-600 mb-1">Car Type</label>
            <Controller
              name="carType"
              control={control}
              rules={{ required: "Car type is required" }}
              render={({ field }) => (
                <Dropdown
                  {...field}
                  options={carTypes}
                  optionLabel="name"
                  placeholder="Select car type"
                  className={`w-full p-inputtext-sm md:p-inputtext-md ${errors.carType ? "p-invalid" : ""}`}
                />
              )}
            />
            {errors.carType && <p className="text-red-400 text-sm mt-1">{errors.carType.message}</p>}
          </motion.div>

          {/* Pickup Date */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.4 }}>
            <label className="block text-sm font-medium text-gray-600 mb-1">Pickup Date</label>
            <Controller
              name="pickupDate"
              control={control}
              rules={{ required: "Pickup date is required" }}
              render={({ field }) => (
                <Calendar
                  {...field}
                  showIcon
                  placeholder="Select pickup date"
                  className={`w-full ${errors.pickupDate ? "p-invalid" : ""}`}
                />
              )}
            />
            {errors.pickupDate && <p className="text-red-400 text-sm mt-1">{errors.pickupDate.message}</p>}
          </motion.div>

          {/* Drop-off Date */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.4 }}>
            <label className="block text-sm font-medium text-gray-600 mb-1">Drop-off Date</label>
            <Controller
              name="dropoffDate"
              control={control}
              rules={{ required: "Drop-off date is required" }}
              render={({ field }) => (
                <Calendar
                  {...field}
                  showIcon
                  placeholder="Select drop-off date"
                  className={`w-full ${errors.dropoffDate ? "p-invalid" : ""}`}
                />
              )}
            />
            {errors.dropoffDate && <p className="text-red-400 text-sm mt-1">{errors.dropoffDate.message}</p>}
          </motion.div>

          {/* Submit Button */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.4 }}>
            <Button
              label="Book Now"
              type="submit"
              className="w-full p-2 md:p-3 text-lg p-button-primary transition-transform transform hover:scale-105 rounded-lg"
            />
          </motion.div>
        </form>

        {/* Confirmation Message */}
        {confirmation && (
          <div className="mt-6 text-center text-sm text-green-600">
            <p>
              Car booked: <strong>{confirmation.car}</strong> from{" "}
              <strong>{confirmation.location}</strong> between{" "}
              <strong>{confirmation.pickup}</strong> and <strong>{confirmation.dropoff}</strong>
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default CarBooking;

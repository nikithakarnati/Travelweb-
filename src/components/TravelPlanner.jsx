import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { motion } from "framer-motion";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const destinations = [
  { name: "Paris", code: "PAR" },
  { name: "New York", code: "NYC" },
  { name: "Tokyo", code: "TOK" },
  { name: "London", code: "LDN" }
];

const TravelPlanner = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();

  const fromDate = watch("fromDate");
  const toDate = watch("toDate");

  const onSubmit = (data) => {
    if (new Date(data.fromDate) > new Date(data.toDate)) {
      alert("From Date cannot be after To Date!");
      return;
    }

    const plan = [];
    const currentDate = new Date(data.fromDate);
    let dayCount = 1;

    while (currentDate <= new Date(data.toDate)) {
      const formattedDate = currentDate.toDateString();

      plan.push(
        { time: formattedDate, activity: `--- Day ${dayCount} ---` },
        { time: "9:00 AM", activity: `Breakfast in ${data.destination.name}` },
        { time: "11:00 AM", activity: `Visit the main attraction of ${data.destination.name}` },
        { time: "2:00 PM", activity: `Lunch at a local restaurant` },
        { time: "4:00 PM", activity: `Explore hidden gems of ${data.destination.name}` },
        { time: "7:00 PM", activity: `Dinner and nightlife` }
      );

      currentDate.setDate(currentDate.getDate() + 1);
      dayCount++;
    }

    navigate("/itinerary", {
      state: {
        itinerary: plan,
        destination: data.destination,
        fromDate: new Date(data.fromDate).toDateString(),
        toDate: new Date(data.toDate).toDateString(),
        travelers: data.travelers
      }
    });
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 overflow-hidden px-4">
      {/* Animated Background Circles */}
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

      {/* Travel Planner Card */}
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        whileHover={{ scale: 1.03, boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.1)" }}
        className="p-6 md:p-8 bg-white shadow-lg rounded-2xl w-full max-w-[400px] md:max-w-[480px] backdrop-blur-lg bg-opacity-90"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-800">🌍 Plan Your Trip</h1>

        <div className="space-y-4">
          {/* Destination Dropdown */}
          <label className="block text-left font-semibold mb-1">Destination</label>
          <Controller
            name="destination"
            control={control}
            rules={{ required: "Destination is required" }}
            render={({ field }) => (
              <Dropdown
                {...field}
                options={destinations}
                optionLabel="name"
                placeholder="Select a destination"
                className="w-full"
              />
            )}
          />
          {errors.destination && (
            <p className="text-red-500 text-sm">{errors.destination.message}</p>
          )}

          {/* Date Pickers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-left font-semibold mb-1">From Date</label>
              <Controller
                name="fromDate"
                control={control}
                rules={{ required: "From Date is required" }}
                render={({ field }) => (
                  <Calendar {...field} showIcon placeholder="Start date" className="w-full" />
                )}
              />
              {errors.fromDate && (
                <p className="text-red-500 text-sm">{errors.fromDate.message}</p>
              )}
            </div>
            <div>
              <label className="block text-left font-semibold mb-1">To Date</label>
              <Controller
                name="toDate"
                control={control}
                rules={{ required: "To Date is required" }}
                render={({ field }) => (
                  <Calendar {...field} showIcon placeholder="End date" className="w-full" />
                )}
              />
              {errors.toDate && (
                <p className="text-red-500 text-sm">{errors.toDate.message}</p>
              )}
            </div>
          </div>

          {/* Travelers Input */}
          <label className="block text-left font-semibold mb-1">Number of Travelers</label>
          <Controller
            name="travelers"
            control={control}
            rules={{
              required: "Number of travelers is required",
              min: { value: 1, message: "At least one traveler required" }
            }}
            render={({ field }) => (
              <InputText {...field} type="number" placeholder="Enter number" className="w-full" />
            )}
          />
          {errors.travelers && (
            <p className="text-red-500 text-sm">{errors.travelers.message}</p>
          )}

          {/* Button */}
          <div className="pt-3">
            <Button
              label="Generate Plan"
              icon="pi pi-check"
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-transform transform hover:scale-105"
            />
          </div>
        </div>
      </motion.form>
    </div>
  );
};

export default TravelPlanner;

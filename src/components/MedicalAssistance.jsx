import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { motion } from "framer-motion";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const mockHospitals = [
  { name: "City Hospital", location: "Paris", contact: "123-456-7890", lat: 48.8566, lng: 2.3522 },
  { name: "MediCare Clinic", location: "Mumbai", contact: "987-654-3210", lat: 19.076, lng: 72.8777 },
  { name: "GreenLife Hospital", location: "New York", contact: "456-789-0123", lat: 40.7128, lng: -74.0060 },
];

const mapContainerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "1rem",
  marginTop: "20px",
};

const MedicalAssistance = () => {
  const [hospitals, setHospitals] = useState([]);
  const [center, setCenter] = useState({ lat: 20.5937, lng: 78.9629 }); // Default: India
  const toast = useRef(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      location: "",
    },
  });

  const onSubmit = (data) => {
    const { location } = data;

    const results = mockHospitals.filter((hospital) =>
      hospital.location.toLowerCase().includes(location.toLowerCase())
    );

    if (results.length > 0) {
      setHospitals(results);
      setCenter({ lat: results[0].lat, lng: results[0].lng });
      toast.current.show({
        severity: "success",
        summary: "Found",
        detail: `${results.length} hospital(s) found.`,
      });
    } else {
      setHospitals([]);
      toast.current.show({
        severity: "info",
        summary: "No Results",
        detail: "No hospitals found in that location.",
      });
    }

    reset();
  };

  const renderMarkers = () =>
    hospitals.map((hospital, index) => (
      <Marker
        key={index}
        position={{ lat: hospital.lat, lng: hospital.lng }}
        title={hospital.name}
      />
    ));

  if (loadError) return <div className="text-center mt-8">Error loading maps</div>;
  if (!isLoaded) return <div className="text-center mt-8">Loading map...</div>;

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 overflow-hidden px-4">
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

      {/* Main Content Container */}
      <div className="z-10 max-w-6xl mx-auto p-4 sm:p-6 lg:p-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-blue-900">🩺 Medical Assistance</h1>
        <Toast ref={toast} />

        {/* Search Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mb-6 bg-white p-6 rounded-lg shadow-md">
          <label className="block mb-2 font-semibold text-gray-700 text-sm sm:text-base">
            Enter Your Location
          </label>
          <InputText
            {...register("location", { required: "Location is required" })}
            placeholder="E.g., Paris, Mumbai, New York"
            className={`w-full p-3 border rounded-lg ${
              errors.location ? "border-red-500" : ""
            }`}
          />
          {errors.location && (
            <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
          )}

          <Button
            label="Find Hospitals"
            icon="pi pi-search"
            className="p-button-sm mt-3 w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white border-none"
            type="submit"
          />
        </form>

        {/* Hospital Cards */}
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Nearby Hospitals</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {hospitals.length > 0 ? (
              hospitals.map((hospital, index) => (
                <Card key={index} className="p-4 bg-white shadow-lg rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-800">{hospital.name}</h3>
                  <p className="text-sm"><strong>Location:</strong> {hospital.location}</p>
                  <p className="text-sm"><strong>Contact:</strong> {hospital.contact}</p>
                  <Button
                    label="📞 Call Now"
                    className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white border-none"
                    onClick={() => (window.location.href = `tel:${hospital.contact}`)}
                  />
                </Card>
              ))
            ) : (
              <p className="text-gray-700 text-sm">No hospitals found. Try searching another city.</p>
            )}
          </div>
        </div>

        {/* Google Map */}
        <div className="mt-10">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={12}
          >
            {renderMarkers()}
          </GoogleMap>
        </div>

        {/* Emergency Contacts */}
        <div className="mt-10 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 text-red-700">🚨 Emergency Contacts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Button
              label="🚑 Ambulance"
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white border-none text-base"
              onClick={() => (window.location.href = "tel:102")}
            />
            <Button
              label="🔥 Fire"
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white border-none text-base"
              onClick={() => (window.location.href = "tel:101")}
            />
            <Button
              label="🚔 Police"
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white border-none text-base"
              onClick={() => (window.location.href = "tel:100")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalAssistance;

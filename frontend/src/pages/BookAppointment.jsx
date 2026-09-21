
import React, { useState } from "react";

import "../css/BookAppointment.css";

import { useAuth } from "@clerk/react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

export default function BookAppointment() {
  const navigate = useNavigate();
  const { getToken } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    notes: ""
  });

  const [availableTimes, setAvailableTimes] = useState([]);
  const [loadingTimes, setLoadingTimes] = useState(false);

  const formatTime = (time) => {
    const [hour, minute] = time.split(":");

    const date = new Date();
    date.setHours(hour);
    date.setMinutes(minute);

    return date.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit"
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = async (e) => {
    const selectedDate = e.target.value;

    setFormData((prev) => ({
      ...prev,
      date: selectedDate,
      time: ""
    }));

    if (!selectedDate) {
      setAvailableTimes([]);
      return;
    }

    try {
      setLoadingTimes(true);

      const response = await fetch(
        `${API_URL}/api/appointments/availability?date=${selectedDate}`
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("Availability error:", data.message);
        setAvailableTimes([]);
        return;
      }

      setAvailableTimes(data.slots || []);
    } catch (error) {
      console.error("Error getting available times:", error);
      setAvailableTimes([]);
    } finally {
      setLoadingTimes(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = await getToken();

      const appointmentData = {
        name: formData.name,
        company: formData.companyName,
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
        appointmentDate: `${formData.date}T${formData.time}:00`,
        notes: formData.notes
      };

      console.log("Sending:", appointmentData);

      const response = await fetch(
        `${API_URL}/api/appointments/availability?date=${selectedDate}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(appointmentData)
        }
      );

      const data = await response.json();

      console.log("Status:", response.status);
      console.log("Backend response:", data);

      if (!response.ok) {
        console.error("Backend error:", data.message);

        toast.error(
          data.message || "Failed to book appointment"
        );

        return;
      }

      console.log("Appointment booked:", data);

      toast.success("Appointment booked successfully!");

      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (error) {
      console.error("Error booking appointment:", error);

      toast.error(
        "Unable to connect to the server. Please try again."
      );
    }
  };

  return (
    <div className="appointment-page">

      <motion.div
        className="appointment-container"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          ease: "easeIn"
        }}
      >

        <div className="appointment-header">
          <h1>Book an Appointment</h1>

          <p>
            Schedule a consultation with Impact Consultancy.
            Select a service, date, and available time.
          </p>
        </div>

        <form
          className="appointment-form"
          onSubmit={handleSubmit}
        >

          <div className="form-group">
            <label htmlFor="name">
              Full Name
            </label>

            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="companyName">
              Company Name
            </label>

            <input
              type="text"
              id="companyName"
              name="companyName"
              placeholder="Enter your company name"
              value={formData.companyName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">
              Email Address
            </label>

            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">
              Phone Number
            </label>

            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="service">
              Service
            </label>

            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
            >
              <option value="">
                Select a service
              </option>

              <option value="business-consultation">
                Business Consultation
              </option>

              <option value="business-planning">
                Business Planning
              </option>

              <option value="marketing-consultation">
                Marketing Consultation
              </option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="date">
              Appointment Date
            </label>

            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleDateChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="time">
              Available Time
            </label>

            <select
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              disabled={
                loadingTimes ||
                availableTimes.length === 0
              }
            >
              <option value="">
                {loadingTimes
                  ? "Loading available times..."
                  : "Select a time"
                }
              </option>

              {availableTimes.map((time) => (
                <option
                  key={time}
                  value={time}
                >
                  {formatTime(time)}
                </option>
              ))}
            </select>
          </div>

    
          <div className="form-group">
            <label htmlFor="notes">
              Additional Information
            </label>

            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Tell us anything you'd like us to know before your appointment..."
              rows="5"
            />
          </div>

          <button
            type="submit"
            className="book-appointment-btn"
          >
            Book Appointment
          </button>

        </form>

      </motion.div>

    </div>
  );
}


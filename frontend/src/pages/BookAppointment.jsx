import React, { useState } from "react";

import "../css/BookAppointment.css";

import { useAuth } from "@clerk/react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

// Trinidad & Tobago is AST (UTC-4) year-round, no DST — safe to hardcode.
const APPOINTMENT_UTC_OFFSET = "-04:00";
const BUSINESS_TIMEZONE = "America/Port_of_Spain";

// Today's date (YYYY-MM-DD) as seen in the business's timezone, not the
// visitor's device timezone — used for the date input's min value and
// for the "is this today?" weekend/past checks below.
function getBusinessToday() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: BUSINESS_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(new Date());
}

// True if the given YYYY-MM-DD string falls on a Saturday or Sunday,
// evaluated at business-timezone midnight.
function isWeekend(dateStr) {
  const instant = new Date(`${dateStr}T00:00:00${APPOINTMENT_UTC_OFFSET}`);
  const day = instant.getUTCDay();
  return day === 0 || day === 6;
}

export default function BookAppointment() {
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL;

  const minDate = getBusinessToday();

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

  // Formats an "HH:mm" slot string directly, with no Date object /
  // timezone conversion involved — avoids any local-time drift.
  const formatTime = (time) => {
    const [hourStr, minute] = time.split(":");
    let hour = parseInt(hourStr, 10);
    const suffix = hour >= 12 ? "PM" : "AM";

    hour = hour % 12;
    if (hour === 0) hour = 12;

    return `${hour}:${minute} ${suffix}`;
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

    // Block picking a date before today (in business time), in case the
    // browser's native date picker min gets bypassed somehow.
    if (selectedDate < minDate) {
      toast.error("You can't book a date in the past.");
      setFormData((prev) => ({ ...prev, date: "" }));
      setAvailableTimes([]);
      return;
    }

    // Block weekends up front rather than silently showing "no times".
    if (isWeekend(selectedDate)) {
      toast.error("We're closed on weekends — please pick a weekday.");
      setFormData((prev) => ({ ...prev, date: "" }));
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
        // Explicit offset so this is an unambiguous instant no matter
        // what timezone the server (or Mongoose) happens to parse it in.
        appointmentDate: `${formData.date}T${formData.time}:00${APPOINTMENT_UTC_OFFSET}`,
        notes: formData.notes
      };

      console.log("Sending:", appointmentData);

      const response = await fetch(
        `${API_URL}/api/appointments`,
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
              min={minDate}
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
                  : availableTimes.length === 0 && formData.date
                  ? "No times available"
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
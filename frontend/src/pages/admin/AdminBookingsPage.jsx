import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useAuth } from "@clerk/react";
import { toast } from "react-toastify";

import AppointmentCard from "../../components/AppointmentCard";
import "../../css/AdminBookingsPage.css";

export default function AdminBookingsPage() {

  const { getToken } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL;
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchAppointments = async () => {

    try {

      setLoading(true);

      const token = await getToken();

      const response = await fetch(
        `${API_URL}/api/appointments`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load appointments"
        );
      }

      setAppointments(data.appointments || []);

    } catch (error) {

      console.error(
        "Error loading appointments:",
        error
      );

      toast.error(
        error.message || "Failed to load appointments"
      );

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {
    fetchAppointments();
  }, []);


  const handleStatusUpdated = (updatedAppointment) => {

    setAppointments((currentAppointments) =>
      currentAppointments.map((appointment) =>
        appointment._id === updatedAppointment._id
          ? updatedAppointment
          : appointment
      )
    );

  };


  return (
    <div className="admin-bookings-page">

      <motion.div
        className="admin-bookings-container"

        initial={{
          opacity: 0,
          x: -40
        }}

        whileInView={{
          opacity: 1,
          x: 0
        }}

        transition={{
          duration: 1.2,
          ease: "easeIn"
        }}

        viewport={{
          once: true,
          amount: 0.5
        }}
      >

        <div className="admin-bookings-header">

          <h1>
            Manage Bookings
          </h1>

          <p>
            View and manage all customer appointments.
          </p>

        </div>


        {loading ? (

          <div className="admin-bookings-message">
            <p>
              Loading appointments...
            </p>
          </div>

        ) : appointments.length === 0 ? (

          <div className="admin-bookings-message">

            <h2>
              No appointments
            </h2>

            <p>
              There are currently no appointments.
            </p>

          </div>

        ) : (

          <div className="admin-appointments-list">

            {appointments.map((appointment) => (

              <AppointmentCard
                key={appointment._id}
                appointment={appointment}
                onStatusUpdated={handleStatusUpdated}
              />

            ))}

          </div>

        )}

      </motion.div>

    </div>
  );
}
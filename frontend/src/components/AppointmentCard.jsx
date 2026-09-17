import React, { useState } from "react";
import { useUser, useAuth } from "@clerk/react";
import { toast } from "react-toastify";

import "../css/AppointmentCard.css";

export default function AppointmentCard({ appointment, onStatusUpdated }) {

  const {
    name,
    company,
    email,
    phone,
    service,
    appointmentDate,
    status,
    notes
  } = appointment;
  const API_URL = import.meta.env.VITE_API_URL;
  const { user } = useUser();
  const { getToken } = useAuth();

  const role = user?.publicMetadata?.role;

  const [selectedStatus, setSelectedStatus] = useState(status);
  const [updating, setUpdating] = useState(false);

  const date = new Date(appointmentDate);

  const formattedDate = date.toLocaleDateString([], {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  const formattedTime = date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit"
  });

  const handleStatusUpdate = async () => {
    try {
      setUpdating(true);

      const token = await getToken();

      const response = await fetch(
        `${API_URL}/api/appointments/${appointment._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            status: selectedStatus
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(
          data.message || "Failed to update appointment"
        );
        return;
      }

      toast.success("Appointment status updated");

      if (onStatusUpdated) {
        onStatusUpdated(data.appointment);
      }

    } catch (error) {
      console.error("Error updating appointment:", error);

      toast.error("Failed to update appointment");

    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="appointment-card">

      <div className="appointment-card-header">

        <div>
          <h3>{service}</h3>

          <p className="appointment-company">
            {company}
          </p>
        </div>

        <span className={`appointment-status ${status}`}>
          {status}
        </span>

      </div>


      <div className="appointment-card-details">

        <div className="appointment-detail">
          <span className="detail-label">
            Client
          </span>

          <span>
            {name}
          </span>
        </div>


        <div className="appointment-detail">
          <span className="detail-label">
            Date
          </span>

          <span>
            {formattedDate}
          </span>
        </div>


        <div className="appointment-detail">
          <span className="detail-label">
            Time
          </span>

          <span>
            {formattedTime}
          </span>
        </div>

      </div>


      <div className="appointment-contact">

        <h4>
          Contact Information
        </h4>

        <div className="contact-details">

          <div className="appointment-detail">

            <span className="detail-label">
              Email
            </span>

            <a href={`mailto:${email}`}>
              {email}
            </a>

          </div>


          <div className="appointment-detail">

            <span className="detail-label">
              Phone
            </span>

            <a href={`tel:${phone}`}>
              {phone}
            </a>

          </div>

        </div>

      </div>


      {notes && (
        <div className="appointment-notes">

          <span className="detail-label">
            Additional Information
          </span>

          <p>
            {notes}
          </p>

        </div>
      )}

      {role === "admin" && (
        <div className="appointment-admin-controls">

          <div className="status-control">

            <label htmlFor={`status-${appointment._id}`}>
              Update Status
            </label>

            <select
              id={`status-${appointment._id}`}
              value={selectedStatus}
              onChange={(e) =>
                setSelectedStatus(e.target.value)
              }
              disabled={updating}
            >
              <option value="pending">
                Pending
              </option>

              <option value="confirmed">
                Confirmed
              </option>

              <option value="cancelled">
                Cancelled
              </option>
            </select>

          </div>


          <button
            className="appointment-confirm-btn"
            onClick={handleStatusUpdate}
            disabled={
              updating ||
              selectedStatus === status
            }
          >
            {updating
              ? "Updating..."
              : "Confirm"}
          </button>

        </div>
      )}

    </div>
  );
}
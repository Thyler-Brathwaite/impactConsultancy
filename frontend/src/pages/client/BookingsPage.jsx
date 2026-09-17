import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useAuth } from "@clerk/react";
import { toast } from "react-toastify";

import AppointmentCard from "../../components/AppointmentCard";
import "../../css/BookingsPage.css";

export default function BookingsPage() {
    const { getToken } = useAuth();
    const API_URL = import.meta.env.VITE_API_URL;

    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const token = await getToken();

                const response = await fetch(
                    `${API_URL}/api/appointments/my`,
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
                console.error("Error loading appointments:", error);

                toast.error(
                    error.message || "Failed to load appointments"
                );

            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, [getToken]);

    return (
        <div className="bookings-page">

            <motion.div
                className="bookings-container"
                initial={{
                    opacity: 0,
                    x: -40,
                }}
                whileInView={{
                    opacity: 1,
                    x: 0,
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

                <div className="bookings-header">
                    <h1>My Bookings</h1>

                    <p>
                        View and manage your upcoming appointments.
                    </p>
                </div>

                {loading ? (
                    <div className="bookings-message">
                        <p>Loading your appointments...</p>
                    </div>
                ) : appointments.length === 0 ? (
                    <div className="bookings-message">
                        <h2>No bookings yet</h2>

                        <p>
                            You don't have any appointments scheduled.
                        </p>
                    </div>
                ) : (
                    <div className="appointments-list">

                        {appointments.map((appointment) => (
                            <AppointmentCard
                                key={appointment._id}
                                appointment={appointment}
                            />
                        ))}

                    </div>
                )}

            </motion.div>

        </div>
    );
}
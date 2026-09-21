import Appointment from "../models/Appointment.js"
import { getAuth, clerkClient } from "@clerk/express";

// Must match the offset used on the frontend (BookAppointment.jsx).
const APPOINTMENT_UTC_OFFSET = "-04:00"; // Trinidad & Tobago (AST), no DST

export async function getAppointment(req,res){
    
    try{
        
        const foundApp = await Appointment.findById(req.params.id)
        if(!foundApp){
            return res.status(404).json({message:"Error in getAppointment"})
        }
        res.status(200).json({message:"appointment successfully found"})
    }catch(error){
        res.status(500).json({message:"error with the server"})
    }
    
}

export async function getMyAppointments(req, res) {
    try {
        const { isAuthenticated, userId } = getAuth(req);

        if (!isAuthenticated) {
            return res.status(401).json({
                message: "You must be logged in"
            });
        }

        const appointments = await Appointment.find({
            clerkId: userId
        }).sort({
            appointmentDate: -1
        });

        res.status(200).json({
            appointments
        });

    } catch (error) {
        console.error("Error getting appointments:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
}

export async function getAppointments(req, res) {
  try {
    const { isAuthenticated, userId } = getAuth(req);

    if (!isAuthenticated) {
      return res.status(401).json({
        message: "You must be logged in"
      });
    }

    const user = await clerkClient.users.getUser(userId);

    const role = user.publicMetadata?.role;

    if (role !== "admin") {
      return res.status(403).json({
        message: "Admin access required"
      });
    }

    const appointments = await Appointment.find().sort({
      appointmentDate: -1
    });

    res.status(200).json({
      appointments
    });

  } catch (error) {
    console.error("Error getting appointments:", error);

    res.status(500).json({
      message: "Error with the server"
    });
  }
}

export async function makeAppointment(req, res) {
    try {
   
        const { isAuthenticated, userId } = getAuth(req);

        if (!isAuthenticated) {
            return res.status(401).json({
                message: "You must be logged in to book an appointment"
            });
        }

        const {
            name,
            company,email,phone,
            service,
            appointmentDate,
            notes
        } = req.body;

        
        if (
            !name ||
            !company ||
            !service ||
            !appointmentDate || 
            !email || 
            !phone
        ) {
            return res.status(400).json({
                message: "Please fill in all required fields"
            });
        }

        
        const existingAppointment = await Appointment.findOne({
            appointmentDate,
            status: {
                $in: ["pending", "confirmed"]
            }
        });

        if (existingAppointment) {
            return res.status(409).json({
                message: "That appointment time is already booked"
            });
        }

     
        const newAppointment = new Appointment({
            clerkId: userId,
            name,
            company,
            email,
            phone,
            service,
            appointmentDate,
            notes
        });

        const savedAppointment = await newAppointment.save();

        res.status(201).json({
            message: "Appointment booked successfully",
            appointment: savedAppointment
        });

    } catch (error) {
        console.error("Error creating appointment:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
}

export async function updateAppointment(req, res) {
  try {
    const { isAuthenticated, userId } = getAuth(req);

    if (!isAuthenticated) {
      return res.status(401).json({
        message: "You must be logged in"
      });
    }

    const user = await clerkClient.users.getUser(userId);

    const role = user.publicMetadata?.role;

    if (role !== "admin") {
      return res.status(403).json({
        message: "Admin access required"
      });
    }

    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        message: "Status is required"
      });
    }

    const allowedStatuses = [
      "pending",
      "confirmed",
      "cancelled"
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid appointment status"
      });
    }

    const updatedApp = await Appointment.findByIdAndUpdate(
      req.params.id,
      {
        status
      },
      {
        returnDocument: "after",
        runValidators: true
      }
    );

    if (!updatedApp) {
      return res.status(404).json({
        message: "Appointment not found"
      });
    }

    res.status(200).json({
      message: "Appointment status updated successfully",
      appointment: updatedApp
    });

  } catch (error) {
    console.error("Error updating appointment:", error);

    res.status(500).json({
      message: "Error with the server"
    });
  }
}

export async function deleteAppointment(req,res){

    try{
        
        const deleteApp = await Appointment.findByIdAndDelete(req.params.id);

        if(!deleteApp){
            return res.status(404).json({message:"Error in deleteAppointment"})
        }
        res.status(200).json({message:"appointment successfully deleted"})

    }catch(error){
        res.status(500).json({message:"error with the server"})
    }
    
}
export async function getAvailableTimes(req, res) {
    try {
        const { date } = req.query;

        if (!date) {
            return res.status(400).json({
                message: "Date is required"
            });
        }

        // Build the instant explicitly at Trinidad midnight, so the
        // day-of-week check below doesn't depend on the server's own
        // local timezone setting.
        const selectedDate = new Date(
            `${date}T00:00:00${APPOINTMENT_UTC_OFFSET}`
        );

        // getUTCDay() is safe here because the -04:00 offset was baked
        // in above — the instant never crosses a UTC day boundary
        // relative to the intended Trinidad date.
        const day = selectedDate.getUTCDay();

        // 0 = Sunday
        // 6 = Saturday
        if (day === 0 || day === 6) {
            return res.status(200).json({
                date,
                slots: []
            });
        }

        // Working hours: 9 AM - 4 PM (Trinidad local time)
        const slots = [];

        for (let hour = 9; hour < 16; hour++) {
            slots.push(
                `${String(hour).padStart(2, "0")}:00`
            );
        }

        // Find existing appointments on that day, using the same fixed
        // offset so this matches how appointmentDate was stored.
        const startOfDay = new Date(
            `${date}T00:00:00${APPOINTMENT_UTC_OFFSET}`
        );
        const endOfDay = new Date(
            `${date}T23:59:59${APPOINTMENT_UTC_OFFSET}`
        );

        const appointments = await Appointment.find({
            appointmentDate: {
                $gte: startOfDay,
                $lte: endOfDay
            },

            status: {
                $in: ["pending", "confirmed"]
            }
        });

        // Remove booked slots
        const availableSlots = slots.filter((slot) => {

            const slotDate = new Date(
                `${date}T${slot}:00${APPOINTMENT_UTC_OFFSET}`
            );

            return !appointments.some((appointment) => {
                return (
                    new Date(
                        appointment.appointmentDate
                    ).getTime() === slotDate.getTime()
                );
            });
        });

        res.status(200).json({
            date,
            slots: availableSlots
        });

    } catch (error) {
        console.error(
            "Error getting available times:",
            error
        );

        res.status(500).json({
            message: "Server error"
        });
    }
}
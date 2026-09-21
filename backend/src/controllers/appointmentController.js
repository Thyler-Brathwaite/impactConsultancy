import Appointment from "../models/Appointment.js"
import { getAuth, clerkClient } from "@clerk/express";

// Must match the offset used on the frontend (BookAppointment.jsx).
const APPOINTMENT_UTC_OFFSET = "-04:00"; // Trinidad & Tobago (AST), no DST
const BUSINESS_TIMEZONE = "America/Port_of_Spain";

// Business hours: appointments can START anywhere from 9am up to 4pm,
// so the last appointment (4pm-5pm) still finishes by closing at 5pm.
const OPENING_HOUR = 9;
const LAST_START_HOUR = 16; // inclusive
const CLOSING_HOUR = 17;

// Builds an absolute instant for a given YYYY-MM-DD date and HH:mm time,
// anchored to the business's fixed UTC offset.
function buildInstant(dateStr, timeStr = "00:00") {
    return new Date(`${dateStr}T${timeStr}:00${APPOINTMENT_UTC_OFFSET}`);
}

function isWeekendDate(dateStr) {
    const day = buildInstant(dateStr).getUTCDay();
    return day === 0 || day === 6;
}

// Today's date (YYYY-MM-DD) in the business's own timezone — used so
// "is this slot in the past" is judged against the business clock, not
// whatever timezone the server process happens to run in.
function getBusinessToday() {
    return new Intl.DateTimeFormat("en-CA", {
        timeZone: BUSINESS_TIMEZONE,
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    }).format(new Date());
}

// Parses an appointmentDate string of the exact shape the frontend sends
// ("YYYY-MM-DDTHH:mm:00-04:00") into its date/hour/minute parts, without
// going through a Date object (which normalizes to UTC and would hide
// the original wall-clock hour). Returns null if the shape doesn't match.
function parseAppointmentString(appointmentDate) {
    const match = /^(\d{4}-\d{2}-\d{2})T(\d{2}):(\d{2}):00-04:00$/.exec(
        appointmentDate
    );

    if (!match) return null;

    const [, dateStr, hourStr, minuteStr] = match;

    return {
        dateStr,
        hour: parseInt(hourStr, 10),
        minute: parseInt(minuteStr, 10)
    };
}

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

        // --- Server-side scheduling validation ---
        // The frontend already restricts this, but a request can hit
        // this endpoint directly (Postman, curl, a modified client), so
        // the same rules must be enforced here too.

        const parsed = parseAppointmentString(appointmentDate);

        if (!parsed) {
            return res.status(400).json({
                message: "Invalid appointment date format"
            });
        }

        const { dateStr, hour, minute } = parsed;

        if (isWeekendDate(dateStr)) {
            return res.status(400).json({
                message: "Appointments are unavailable on weekends"
            });
        }

        const isValidStartTime =
            minute === 0 &&
            hour >= OPENING_HOUR &&
            hour <= LAST_START_HOUR;

        if (!isValidStartTime) {
            return res.status(400).json({
                message: `Appointments are only available between ${OPENING_HOUR}:00 and ${CLOSING_HOUR}:00, on the hour`
            });
        }

        const requestedInstant = new Date(appointmentDate);

        if (requestedInstant.getTime() <= Date.now()) {
            return res.status(400).json({
                message: "Appointment time must be in the future"
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

        // Reject past dates outright.
        const businessToday = getBusinessToday();

        if (date < businessToday) {
            return res.status(200).json({
                date,
                slots: []
            });
        }

        // Monday-Friday only.
        if (isWeekendDate(date)) {
            return res.status(200).json({
                date,
                slots: []
            });
        }

        // Working hours: 9 AM - 5 PM, one slot per hour, last start at 4 PM.
        const slots = [];

        for (let hour = OPENING_HOUR; hour <= LAST_START_HOUR; hour++) {
            slots.push(
                `${String(hour).padStart(2, "0")}:00`
            );
        }

        // Find existing appointments on that day, using the same fixed
        // offset so this matches how appointmentDate was stored.
        const startOfDay = buildInstant(date, "00:00");
        const endOfDay = buildInstant(date, "23:59");

        const appointments = await Appointment.find({
            appointmentDate: {
                $gte: startOfDay,
                $lte: endOfDay
            },

            status: {
                $in: ["pending", "confirmed"]
            }
        });

        const now = Date.now();

        const availableSlots = slots.filter((slot) => {

            const slotDate = buildInstant(date, slot);

            // Drop slots that have already started/passed (only matters
            // when `date` is today; for future dates this is always true).
            if (slotDate.getTime() <= now) {
                return false;
            }

            const isBooked = appointments.some((appointment) => {
                return (
                    new Date(
                        appointment.appointmentDate
                    ).getTime() === slotDate.getTime()
                );
            });

            return !isBooked;
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
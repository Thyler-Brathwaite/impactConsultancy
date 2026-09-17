import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    clerkId: {
        type:String,
        required: true
    },

    name:{
        type: String,
        required: true
    },

    company:{
        type: String,
        required: true
    },

    email:{
        type: String,
        required: true
    },

    phone:{
        type: String,
        required: true
    },

    service: {
        type: String,
        required: true
    },

    appointmentDate: {
        type: Date,
        required: true
    },

    status: {
        type: String,
        enum: ['pending', 'confirmed', 'completed', 'cancelled'],
        default: 'pending'
    },

    notes: {
        type: String
    }
    
})

const Appointment = mongoose.model("appointment", appointmentSchema)

export default Appointment
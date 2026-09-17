import express from 'express'
import {getAvailableTimes,getAppointment, getAppointments,makeAppointment, updateAppointment,deleteAppointment, getMyAppointments} from '../controllers/appointmentController.js'

const router = express.Router();

router.get("/", getAppointments);
router.get("/my", getMyAppointments);
router.get("/availability", getAvailableTimes);

router.get("/:id", getAppointment);

router.post("/", makeAppointment);

router.put("/:id", updateAppointment);

router.delete("/:id", deleteAppointment);



export default router;

import express from "express";
import { getAllTickets, getLatestTicketNumber } from "../controllers/ticketController.js";

const router = express.Router();

router.get("/", getAllTickets);
router.get("/latest-number", getLatestTicketNumber);

export default router;

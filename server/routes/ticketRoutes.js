import express from "express";
import { 
    getAllTickets, 
    getLatestTicketNumber, 
    createTicket, 
    changeTicketStatus,

    

} from "../controllers/ticketController.js";

const router = express.Router();

router.get("/", getAllTickets);
router.get("/latest-number", getLatestTicketNumber);
router.post("/", createTicket);

// 👇 STATUS UPDATE
router.patch("/:ticket_id/status", changeTicketStatus);

export default router;

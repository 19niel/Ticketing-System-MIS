import express from "express";
import { 
    getAllTickets, 
    getLatestTicketNumber, 
    createTicket, 

    

} from "../controllers/ticketController.js";

const router = express.Router();

router.get("/", getAllTickets);
router.get("/latest-number", getLatestTicketNumber);
router.post("/", createTicket);



export default router;

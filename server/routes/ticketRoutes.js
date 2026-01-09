import { db } from "../db.js";

export const createTicket = (req, res) => {
  const {
    subject,
    description,
    category_id,
    priority_id,
    created_by,
  } = req.body;

  if (!subject || !description || !category_id || !priority_id || !created_by) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // Generate ticket number (ex: TCK-2026-000123)
  const ticketNumber = `TCK-${new Date().getFullYear()}-${Date.now()
    .toString()
    .slice(-6)}`;

  const sql = `
    INSERT INTO tickets
    (ticket_number, created_by, category_id, subject, description, status_id, priority_id, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
  `;

  db.query(
    sql,
    [
      ticketNumber,
      created_by,
      category_id,
      subject,
      description,
      1, // status_id = Open
      priority_id,
    ],
    (err, result) => {
      if (err) {
        console.error("Create ticket error:", err);
        return res.status(500).json({ message: "Failed to create ticket" });
      }

      res.status(201).json({
        message: "Ticket created successfully",
        ticket_id: result.insertId,
        ticket_number: ticketNumber,
      });
    }
  );
};

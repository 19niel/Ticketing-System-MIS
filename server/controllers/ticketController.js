import { db } from "../db.js";

export const getAllTickets = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        t.ticket_id,
        t.ticket_number,
        t.subject,
        t.description,
     

        -- creator
        CONCAT(creator.first_name, ' ', creator.last_name) AS created_by,

        -- assigned tech
        CONCAT(assignee.first_name, ' ', assignee.last_name) AS assigned_to,

        -- status & priority
        s.status_name AS status,
        p.priority_name AS priority,

        -- category (optional readable)
        c.category_name AS category,
        t.closed_at,
        t.created_at,
        t.updated_at

      FROM tickets t
      LEFT JOIN users creator ON t.created_by = creator.employee_id
      LEFT JOIN users assignee ON t.assigned_to = assignee.employee_id
      LEFT JOIN ticket_status s ON t.status_id = s.status_id
      LEFT JOIN priorities p ON t.priority_id = p.priority_id
      LEFT JOIN categories c ON t.category_id = c.category_id

      ORDER BY t.created_at DESC
    `);

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch tickets" });
  }
};


export const getLatestTicketNumber = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT ticket_number FROM tickets ORDER BY ticket_id DESC LIMIT 1"
    );

    const latestTicketNumber = rows.length ? rows[0].ticket_number : "TKT-0000000";

    res.json({ latestTicketNumber });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};


export const createTicket = async (req, res) => {
  try {
    const {
      ticket_number,
      subject,
      description,
      created_by,
      assigned_to,
      status_id,
      priority_id,
      category_id,
      closed_at_id,
    } = req.body;

    const sql = `
      INSERT INTO tickets (
        ticket_number,
        subject,
        description,
        created_by,
        assigned_to,
        status_id,
        priority_id,
        category_id,
        closed_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      ticket_number,
      subject,
      description,
      created_by,
      assigned_to,
      status_id,     // 👈 mapped to status_id
      priority_id,   // 👈 mapped to priority_id
      category_id,   // 👈 mapped to category_id
      closed_at_id,
    ];

    const [result] = await db.query(sql, values);

    res.status(201).json({
      message: "Ticket created successfully",
      ticket_id: result.insertId,
      ticket_number,
    });
  } catch (err) {
    console.error("Create ticket error:", err);
    res.status(500).json({ error: err.message });
  }
};


export const changeTicketStatus = async (req, res) => {
  try {
    const { ticket_id } = req.params;
    const { status_id } = req.body;

    // Optional: auto-close ticket if status is "Closed"
    const closedAt =
      Number(status_id) === 3 ? new Date() : null; // adjust 3 to your CLOSED status_id

    const sql = `
      UPDATE tickets
      SET
        status_id = ?,
        closed_at = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE ticket_id = ?
    `;

    const [result] = await db.query(sql, [
      status_id,
      closedAt,
      ticket_id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.json({ message: "Ticket status updated successfully" });
  } catch (err) {
    console.error("Change status error:", err);
    res.status(500).json({ error: err.message });
  }
};
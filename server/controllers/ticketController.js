import { db } from "../db.js";

export const getAllTickets = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        t.ticket_id,
        t.ticket_number,
        t.subject,
        t.description,
        t.created_at,

        -- creator
        CONCAT(creator.first_name, ' ', creator.last_name) AS created_by,

        -- assigned tech
        CONCAT(assignee.first_name, ' ', assignee.last_name) AS assigned_to,

        -- status & priority
        s.status_name AS status,
        p.priority_name AS priority,

        -- category (optional readable)
        c.category_name AS category

      FROM tickets t
      LEFT JOIN users creator ON t.created_by = creator.user_id
      LEFT JOIN users assignee ON t.assigned_to = assignee.user_id
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
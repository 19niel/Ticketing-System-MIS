import {db} from "../db.js";

export const getAllUsers = async (req, res) => {
  try {
    const [rows] = await db.query(`
        SELECT
        u.user_id AS id,
        u.employee_id,
        CONCAT(u.first_name, ' ', u.last_name) AS name,
        u.email,
        u.position,
        d.department_name AS department,
        r.role_name AS role,
        u.is_active
        
        FROM users u
        JOIN departments d ON u.department_id = d.department_id
        JOIN roles r ON u.role_id = r.role_id
  ` 
        );
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
};

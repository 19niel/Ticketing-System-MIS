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

export const addUser = async (req, res) => {
  try {
    const { employee_id, first_name, last_name, position, department_id, role_id, email, password, is_active = true } = req.body;

    const [result] = await db.query(
      `INSERT INTO users 
       (employee_id, first_name, last_name, position, department_id, role_id, email, password_hash, is_active)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [employee_id, first_name, last_name, position, department_id, role_id, email, password, is_active]
    );

    res.status(201).json({ message: "User added", user_id: result.insertId });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") return res.status(409).json({ message: "Email or employee ID exists" });
    res.status(500).json({ message: "Server error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      employee_id,
      first_name,
      last_name,
      position,
      department_id,
      role_id,
      email,
      is_active,
    } = req.body;

    await db.query(
      `UPDATE users SET
        employee_id = ?,
        first_name = ?,
        last_name = ?,
        position = ?,
        department_id = ?,
        role_id = ?,
        email = ?,
        is_active = ?
       WHERE user_id = ?`,
      [
        employee_id,
        first_name,
        last_name,
        position,
        department_id,
        role_id,
        email,
        is_active,
        id,
      ]
    );

    res.json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({ message: "Server error" });
  }
}


export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query("DELETE FROM users WHERE user_id = ?", [id]);

    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

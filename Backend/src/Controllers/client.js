import { query } from "../connection.js";

export const fetchClient = async (req, res) => {
    try {
        const { rows } = await query("SELECT * FROM clients_tb"); // Make sure the table name is correct
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch clients" });
    }
};


export const createClient = async (req, res) => {
    try {
        const { name, email, job, rate , isactive } = req.body;
        
        // Make sure you're inserting into the correct table name
        const { rows } = await query(
            "INSERT INTO clients_tb (name, email, job, rate, isactive) VALUES ($1, $2, $3, $4, $5) RETURNING *", 
            [name, email, job, rate, isactive]
        );
        
        // Send back the created client with a 201 status code
        res.status(201).json(rows[0]);  // Returning just the first row as it contains the newly created client
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create client" });
    }
};


export const updateClient = async (req, res) => {
    try {
        console.log("update hi");
        
        const { id } = req.params;
        const { name, email, job, rate , isactive } = req.body;
        
        // Make sure you're updating the correct table name
        const { rows } = await query(
            "UPDATE clients_tb SET name = $1, email = $2, job = $3, rate = $4, isactive = $5 WHERE id = $6 RETURNING *", 
            [name, email, job, rate, isactive, id]
        );
        
        // Send back the updated client with a 200 status code
        res.status(200).json(rows[0]);  // Returning just the first row as it contains the updated client
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update client" });
    }
}


export const deleteClient = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Make sure you're deleting from the correct table name
        const { rows } = await query("DELETE FROM clients_tb WHERE id = $1 RETURNING *", [id]);
        
        // Send back the deleted client with a 200 status code
        res.status(200).json(rows[0]);  // Returning just the first row as it contains the deleted client
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete client" });
    }
}


export const searchClient = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Make sure you're searching from the correct table name
        const { rows } = await query("SELECT * FROM clients_tb WHERE id = $1", [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: "Client not found" });
        }
        // Send back the searched client with a 200 status code
        res.status(200).json(rows[0]);  // Returning just the first row as it contains the searched client
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to search client" });
    }
}
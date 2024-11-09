import pg from "pg";
import env from "dotenv";

env.config();

// const client = new pg.Client({
//     user: process.env.DATABASE_USER,
//     host: process.env.DATABASE_HOST,
//     database: process.env.DATABASE,
//     password: process.env.DATABASE_PASSWORD,
//     port: process.env.DATABASE_PORT
// });

const client = new pg.Client({
    connectionString: process.env.DATABASE_URL,
});

client.connect()
    .then(() => {
        console.log('Connected to the database');
    })
    .catch((err) => {
        console.error('Error connecting to the database:', err);
    });

// export const query = async (text, params) => client.query(text, params);

export const query = async (text, params) => {
    try {
        const result = await client.query(text, params); // Use the pool to query
        return result; // Return the result
    } catch (err) {
        console.error('Database query error:', err);
        throw new Error('Database query failed');
    }
};
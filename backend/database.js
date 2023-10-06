import mysql from 'mysql2/promise';
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'lkop11vber',
    database: 'poc',
});
export const createUser = async (name, profileTitle, email, password, image, dob, phone, bio, profileColor, introVideo,favouriteVideo) => {
    try {
        const result = await pool.query(`
            INSERT INTO user (name, profileTitle, email, password, image, dob, phone, bio, profileColor, introVideo,favouriteVideo)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?);
        `, [name, profileTitle, email, password, image, dob, phone, bio, profileColor, introVideo,favouriteVideo]);

        return result;
    } catch (error) {
        console.error('Error creating user:', error.message);
        throw error; 
    }
};

export const getAllUsers = async () => {
    try {
        const result = await pool.query('SELECT * FROM user');
        return result[0];
    } catch (error) {
        console.error('Error fetching all users:', error.message);
        throw error;
    }
};

export const deleteUser = async (id) => {
    try {
        const result = await pool.query('DELETE FROM user WHERE userId = ?', [id]);
        return result;
    } catch (error) {
        console.error(`Error deleting user with id ${id}:`, error.message);
        throw error;
    }
};

export const getUserById = async (id) => {
    try {
        const result = await pool.query('SELECT * FROM user WHERE userId = ?', [id]);
        return result[0];
    } catch (error) {
        console.error(`Error fetching user with id ${id}:`, error.message);
        throw error;
    }
};

export const updateUser = async (email, updateFields) => {
    try {

        if (typeof updateFields !== 'object' || updateFields === null) {
            throw new Error('Invalid updateFields. It should be an object.');
        }

        const setClause = Object.keys(updateFields)
            .map(field => `${field} = ?`)
            .join(', ');

        const values = Object.values(updateFields);
        console.log(setClause)
        console.log(values)
        const result = await pool.query(`
            UPDATE user
            SET ${setClause}
            WHERE email = ?
        `, [...values, email]);

        return result;
    } catch (error) {
        console.error(`Error updating user with email ${email}:`, error.message);
        throw error;
    }
};


// const result = await createUser('jayanth', 'fasdf', 'hk1j@gmail.com', 'null', 'afdsfsdafasdf', '2023-09-30', '1234167824', 'asdfdfsdafsdfsdafsdfasdf', '#000000', '');
// const allUsers = await getAllUsers();
// const userByEmail = await getUserByEmail('hk1j@gmail.com');
// const updateResult = await updateUser('hk1j@gmail.com', { bio: 'Updated bio text', profileColor: '#FFFFFF' });
// console.log(updateResult);

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

export const updateUser = async (userId, name, profileTitle, email, password, image, dob, phone, bio, profileColor, introVideo, favouriteVideo) => {
    try {
        const result = await pool.query(`
            UPDATE user
            SET name = ?, 
                profileTitle = ?, 
                email = ?, 
                password = ?, 
                image = ?, 
                dob = ?, 
                phone = ?, 
                bio = ?, 
                profileColor = ?, 
                introVideo = ?, 
                favouriteVideo = ?
            WHERE userId = ?;
        `, [name, profileTitle, email, password, image, dob, phone, bio, profileColor, introVideo, favouriteVideo, userId]);

        return result;
    } catch (error) {
        console.error('Error updating user:', error.message);
        throw error; 
    }
};




import express from 'express';
import cors from 'cors'
import { getAllUsers, createUser, updateUser, getUserById,deleteUser} from './database.js';

const app = express();
const port = 3000;

app.use(cors())


app.use(express.json());

app.post('/createUser', async (req, res) => {
    const { name, profileTitle, email, password, image, dob, phone, bio, profileColor, introVideo,favouriteVideo} = req.body;

    try {
        const result = await createUser(name, profileTitle, email, password, image, dob, phone, bio, profileColor, introVideo,favouriteVideo);
        res.json({ success: true, message: 'User created successfully', result });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error creating user', error: error.message });
        console.error('Error creating user:', error);
        throw error;
    }
});

app.get('/getAllUsers', async (req, res) => {
    try {
        const result = await getAllUsers();
        res.json({ success: true, users: result });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching all users', error: error.message });
    }
});

app.get('/getUserById/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const result = await getUserById(id);
        res.json({ success: true, user: result });
    } catch (error) {
        res.status(500).json({ success: false, message: `Error fetching user with id ${id}`, error: error.message });
    }
});

app.delete('/deleteUser/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const result = await deleteUser(id);
        res.json({ success: true, message: 'User deleted successfully', result });
    } catch (error) {
        res.status(500).json({ success: false, message: `Error deleting user with id ${id}`, error: error.message });
    }
});

app.put('/updateUser/:id', async (req, res) => {
    const userId = req.params.id;
    const {
        name,
        profileTitle,
        email,
        password,
        image,
        dob,
        phone,
        bio,
        profileColor,
        introVideo,
        favouriteVideo,
    } = req.body;

    try {
        const result = await updateUser(
            userId,
            name,
            profileTitle,
            email,
            password,
            image,
            dob,
            phone,
            bio,
            profileColor,
            introVideo,
            favouriteVideo
        );

        res.json({ success: true, message: 'User updated successfully', result });
    } catch (error) {
        res.status(500).json({ success: false, message: `Error updating user with ID ${userId}`, error: error.message });
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

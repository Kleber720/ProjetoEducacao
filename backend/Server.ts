import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/UserRoutes';

const app= express();

dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api', userRoutes);



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
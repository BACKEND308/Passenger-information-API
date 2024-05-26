import dotenv from 'dotenv';
import express from 'express';
import connectMongo from './db/connectMongo.js';
import passengerRoutes from './routes/passenger.routes.js';



dotenv.config();

const app = express();
app.use(express.json());

// Connect to MongoDB
connectMongo();

app.use('/api/passengers', passengerRoutes); // Use the passenger routes



const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

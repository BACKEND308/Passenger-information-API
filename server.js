import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors'; // imported cors
import connectMongo from './db/connectMongo.js';
import passengerRoutes from './routes/passenger.routes.js';



dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectMongo();

app.use('/api/passengers', passengerRoutes); // Use the passenger routes



const port = process.env.PORT || 5004;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

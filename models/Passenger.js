import mongoose from 'mongoose';

const PassengerSchema = new mongoose.Schema({
  passenger_id: {
    type: String,
    required: true,
    unique: true
  },
  Name: {
    type: String,
    required: true
  },
  Flight_ID: {
    type: String,
    required: true
  },
  Age: {
    type: Number,
    required: true
  },
  Gender: {
    type: String,
    required: true
  },
  Nationality: {
    type: String,
    required: true
  },
  Seat_type: {
    type: String,
    required: true,
    enum: ['business', 'economy', 'None'],
    default: 'None'
  },
  Seat_assigned: {
    type: String,
    default: null
  },
  AffiliatedPassengerIDs: {
    type: [String],
    default: []
  }
}, { collection: 'passenger_info' });

const Passenger = mongoose.model('Passenger', PassengerSchema);

export default Passenger;

import mongoose from 'mongoose';

const PassengerSchema = new mongoose.Schema({
  Email: {
    type: String,
    required: true,
    unique: true,
    default: '-'
  },
  Password: {
    type: String,
    required: true,
    default: '-'
  },
  PassportNumber: {
    type: Number,
    unique: true,
    required: true
  },
  CustomerName: {
    type: String,
    required: true,
    default: '-'
  },
  Seat_Assigned: {
    type: String,
    required: true,
    default: '-'
  },
  Disabilities: {
    type: String,
    default: '-'
  },
  Age: {
    type: Number,
    required: true,
    default: 0
  },
  FlightNumber: {
    type: String,
    required: true,
    default: '-'
  },
  PhoneNumber: {
    type: String,
    required: true,
    default: '-'
  },
  Gender: {
    type: String,
    required: true,
    default: '-'
  },
  Nationality: {
    type: String,
    required: true,
    default: '-'
  },
  SeatType: {
    type: String,
    required: true,
    enum: ['business', 'economy', '-'],
    default: '-'
  },
  ParentInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Passenger',
    default: null
  },
  AffiliatedPassengerIDs: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Passenger',
    default: []
  },
  with_a_Child: {
    type: Boolean,
    default: false
  }
});

const Passenger = mongoose.model('Passenger', PassengerSchema, 'passenger_info');

export default Passenger;

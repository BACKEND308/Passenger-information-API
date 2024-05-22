import mongoose from 'mongoose';

const FlightSchema = new mongoose.Schema({
  flightNumber: { 
    type: String, 
    required: true, 
    unique: true, 
    match: /^[A-Z]{2}\d{4}$/ // Ensure format is AANNNN
  },
  flightInfo: {
    departureDate: { type: Date, required: true },
    arrivalDate: { type: Date, required: true },
    duration: { type: Number, required: true }, // in minutes
    distance: { type: Number, required: true } // in kilometers
  },
  flightSource: {
    country: { type: String, required: true },
    city: { type: String, required: true },
    airportName: { type: String, required: true },
    airportCode: { type: String, required: true, match: /^[A-Z]{3}$/ } // Ensure format is AAA
  },
  flightDestination: {
    country: { type: String, required: true },
    city: { type: String, required: true },
    airportName: { type: String, required: true },
    airportCode: { type: String, required: true, match: /^[A-Z]{3}$/ } // Ensure format is AAA
  },
  vehicleType: {
    type: { type: String, required: true },
    seats: { type: Number, required: true },
    seatingPlan: { type: String, required: true },
    crewLimit: { type: Number, required: true },
    passengerLimit: { type: Number, required: true },
    standardMenu: { type: String, required: true }
  },
  sharedFlightInfo: {
    isShared: { type: Boolean, default: false },
    sharedFlightNumber: { type: String, match: /^[A-Z]{2}\d{4}$/ }, // Ensure format is AANNNN
    flightCompany: { type: String },
    connectingFlight: {
      flightNumber: { type: String, match: /^[A-Z]{2}\d{4}$/ }, // Ensure format is AANNNN
      company: { type: String }
    }
  }
});

const Flight = mongoose.model('Flight', FlightSchema);

export default Flight;

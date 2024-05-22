import mongoose from 'mongoose';

const CabinCrewSchema = new mongoose.Schema({
  attendantId: { 
    type: String, 
    required: true, 
    unique: true 
  },
  attendantInfo: {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    nationality: { type: String, required: true },
    knownLanguages: { type: [String], required: true }
  },
  attendantType: {
    type: String, 
    enum: ['chief', 'regular', 'chef'], 
    required: true 
  },
  vehicleRestriction: { 
    type: [String], 
    required: true 
  },
  chefDetails: {
    recipes: {
      type: [String],
      validate: {
        validator: function(v) {
          return this.attendantType !== 'chef' || (v && v.length >= 2 && v.length <= 4);
        },
        message: 'Chef must have 2-4 recipes.'
      }
    }
  }
});

const CabinCrew = mongoose.model('CabinCrew', CabinCrewSchema);

export default CabinCrew;

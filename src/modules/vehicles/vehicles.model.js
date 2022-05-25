import mongoose from "mongoose";

const VehiclesSchema = new mongoose.Schema({
  title: { type: String, maxlength: 50, required: true},
  brand: { type: String, maxlength: 20, required: true},
  description: { type: String, maxlength: 100, required: true},
  color: { type: String, maxlength: 50, required: true},
  year: { type: Number, maxlength: 4, required: true},
  licensePlate: { type: String, maxlength: 7},
  price: { type: Number, required: true},
  isFavorite: { type: Boolean, required: true}
})

export default mongoose.models.Vehicles || mongoose.model('Vehicles', VehiclesSchema)
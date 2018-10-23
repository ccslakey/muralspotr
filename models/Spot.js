import mongoose from 'mongoose';

const SpotSchema = new mongoose.Schema({ 
    name: { type: String, required: true, index: { unique: true }},
    location_name: String,
    lat: { type: Number, required: true },
    long: { type: Number, required: true },
    updated: { type: Date, default: Date.now },
    created: { type: Date, default: Date.now },
    uploaded_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    img_url: String,
});

const Spot = mongoose.model('Spot', SpotSchema);
// SpotSchema.set('collection', 'Spot');

export default Spot;

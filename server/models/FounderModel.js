import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  content1: {
    type: String,
    required: true,
  },
  content2: {
    type: String,
    required: true,
  },
  image: {
    type: String, 
    required: true,
  },
}, { timestamps: true });

const Founder = mongoose.model('Content', contentSchema);
export default Founder;

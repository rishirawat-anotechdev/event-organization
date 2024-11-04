import mongoose from 'mongoose';

const aboutUsSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
    minlength: 1, // Minimum 1000 words
  },
  completedProjects: {
    type: Number,
    required: true,
    min: 0, // Must be a non-negative number
  },
  originalConcepts: {
    type: Number,
    required: true,
    min: 0, // Must be a non-negative number
  },
  regularCustomers: {
    type: Number,
    required: true,
    min: 0, // Must be a non-negative number
  },
  yearsOfExperience: {
    type: Number,
    required: true,
    min: 0, // Must be a non-negative number
  },
}, { timestamps: true });

const AboutUs = mongoose.model('AboutUs', aboutUsSchema);
export default AboutUs;

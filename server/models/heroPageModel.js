import mongoose from 'mongoose';

const HeroPageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  heading: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const HeroPage = mongoose.model('HeroPage', HeroPageSchema);

export default HeroPage;
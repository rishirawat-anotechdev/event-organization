import mongoose from 'mongoose';

const TestimonialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    feedback: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    }
}, { timestamps: true });

const Testimonial = mongoose.model('Testimonial', TestimonialSchema);

export default Testimonial;

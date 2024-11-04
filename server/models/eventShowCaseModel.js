import mongoose from 'mongoose';

const eventShowcaseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    images: [
        {
            type: String,
            required: true
        },
    ],
    eventDate: {
        type: Date,
        required: true,
    },
}, { timestamps: true });

const EventShowcase = mongoose.model('EventShowcase', eventShowcaseSchema);
export default EventShowcase;

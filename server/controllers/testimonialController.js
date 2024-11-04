import Testimonial from '../models/testimonialModel.js';

// Create a new testimonial
export const createTestimonial = async (req, res) => {
    try {
        const { name, feedback, rating } = req.body;
        const newTestimonial = new Testimonial({ name, feedback, rating });
        await newTestimonial.save();
        res.status(201).json({ message: 'Testimonial created successfully', testimonial: newTestimonial });
    } catch (error) {
        res.status(500).json({ error: 'Error creating testimonial' });
    }
};

// Get all testimonials
export const getAllTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find().sort({ createdAt: -1 }); 
        res.status(200).json(testimonials);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching testimonials' });
    }
};

// Delete a testimonial by ID
export const deleteTestimonial = async (req, res) => {
    try {
        const testimonialId = req.params.id;
        const deletedTestimonial = await Testimonial.findByIdAndDelete(testimonialId);
        if (!deletedTestimonial) {
            return res.status(404).json({ error: 'Testimonial not found' });
        }
        res.status(200).json({ message: 'Testimonial deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting testimonial' });
    }
};

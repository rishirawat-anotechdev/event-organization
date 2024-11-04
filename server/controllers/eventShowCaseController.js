import cloudinary from 'cloudinary';
import { Readable } from 'stream';
import EventShowcase from '../models/eventShowCaseModel.js';

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload an event image
const uploadImageToCloudinary = (file) => {
    return new Promise((resolve, reject) => {
        const stream = new Readable();
        stream.push(file.data);
        stream.push(null);

        const uploadStream = cloudinary.v2.uploader.upload_stream({ folder: 'events' }, (error, uploadResult) => {
            if (error) return reject(error);
            resolve(uploadResult.secure_url); // Resolve with image URL
        });

        stream.pipe(uploadStream);
    });
};


// Create showcase events
export const createEventShowCase = async (req, res) => {
    const { title, description, eventDate } = req.body;
    const files = req.files?.images;

    if (!title || !description || !eventDate || !files || files.length === 0) {
        return res.status(400).json({ message: "All fields (title, description, eventDate, images) are required." });
    }

    try {
        const imageUploadPromises = Array.isArray(files)
            ? files.map(file => uploadImageToCloudinary(file)) // Uploading multiple files if provided
            : [uploadImageToCloudinary(files)]; // For single file

        const uploadedImages = await Promise.all(imageUploadPromises); // Resolving promises for all image uploads

        // Store the array of image URLs as strings in the `images` field
        const newEventShow = new EventShowcase({
            title,
            description,
            images: uploadedImages, // Storing images as an array of strings (URLs)
            eventDate
        });

        await newEventShow.save();
        res.status(201).json({ message: "Showcase event created successfully", newEventShow });
    } catch (error) {
        res.status(500).json({ message: 'Error creating event', error });
    }
};


// Update showcase events
export const updateEventShowcase = async (req, res) => {
    const { id } = req.params;
    const { title, description, eventDate } = req.body;

    try {
        const showCaseEvent = await EventShowcase.findById(id);
        if (!showCaseEvent) {
            return res.status(404).json({ message: "Showcase event not found" });
        }

        const updates = {
            title: title || showCaseEvent.title,
            description: description || showCaseEvent.description,
            eventDate: eventDate || showCaseEvent.eventDate,
        };

        if (req.files?.images) {
            const files = req.files.images;

            // Delete old images from Cloudinary
            const imageDeletionPromises = showCaseEvent.images.map(imageUrl => {
                const publicId = imageUrl.split('/').pop().split('.')[0]; // Extract publicId from URL
                return cloudinary.v2.uploader.destroy(`events/${publicId}`);
            });
            await Promise.all(imageDeletionPromises);

            // Upload new images to Cloudinary
            const imageUploadPromises = Array.isArray(files)
                ? files.map(file => uploadImageToCloudinary(file))
                : [uploadImageToCloudinary(files)];

            const uploadedImages = await Promise.all(imageUploadPromises);

            // Update the images field with new image URLs
            updates.images = uploadedImages;
        }

        Object.assign(showCaseEvent, updates);
        await showCaseEvent.save();

        res.status(200).json({ message: "Showcase event updated successfully", showCaseEvent });
    } catch (error) {
        res.status(500).json({ message: 'Error updating event', error:error });
    }
};




// Delete showcase events
export const deleteEventShowcase = async (req, res) => {
    const { id } = req.params;

    try {
        const showcaseEvent = await EventShowcase.findById(id);
        if (!showcaseEvent) {
            return res.status(404).json({ message: "Showcase event not found" });
        }

        // Delete all images from Cloudinary
        const imageDeletionPromises = showcaseEvent.images.map(imageUrl => {
            const publicId = imageUrl.split('/').pop().split('.')[0]; // Extract publicId from URL
            return cloudinary.v2.uploader.destroy(`events/${publicId}`);
        });
        await Promise.all(imageDeletionPromises);

        // Delete the event from MongoDB
        await EventShowcase.findByIdAndDelete(id)
        res.status(200).json({ message: "Showcase event deleted successfully" });
    } catch (error) {
        console.error('Error deleting event:', error); // Log error for debugging
        res.status(500).json({ message: 'Error deleting event', error: error.message });
    }
};



// Get all showcase events
export const getAllEventShowcases = async (req, res) => {
    try {
        const eventShowcases = await EventShowcase.find();
        res.status(200).json(eventShowcases);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching events', error });
    }
};


// Get single showcase event by ID
export const getEventShowcaseById = async (req, res) => {
    const { id } = req.params;

    try {
        const showcaseEvent = await EventShowcase.findById(id);
        if (!showcaseEvent) {
            return res.status(404).json({ message: "Showcase event not found" });
        }
        res.status(200).json(showcaseEvent);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching event', error });
    }
};



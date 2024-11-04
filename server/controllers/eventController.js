import cloudinary from 'cloudinary';
import Event from '../models/EventModel.js';
import { Readable } from 'stream';
import Category from '../models/categoriesModel.js';


// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


// Create a new event
export const createEvent = async (req, res) => {
    const { title, description, category } = req.body;
    const file = req.files?.image;

    if (!file) {
        return res.status(400).json({ message: "Image is required" });
    }

    try {
        // Create a readable stream from the file buffer
        const stream = new Readable();
        stream.push(file.data);
        stream.push(null); // Signal the end of the stream

        // Upload the stream to Cloudinary
        const uploadStream = cloudinary.v2.uploader.upload_stream(
            { folder: 'events' },
            async (error, uploadResult) => {
                if (error) {
                    return res.status(500).json({ message: 'Error uploading image to Cloudinary', error });
                }

                // Create a new event after the image has been uploaded
                const newEvent = new Event({
                    title,
                    description,
                    imageUrl: uploadResult.secure_url,
                    category,
                });

                await newEvent.save();

                await Category.findByIdAndUpdate(
                    category,
                    { $push: { events: newEvent._id } }, // Assuming the category schema has an events array
                    { new: true } // Return the updated category
                );
                res.status(201).json({ message: 'Event created successfully', event: newEvent });
            }
        );

        // Pipe the stream to the upload stream
        stream.pipe(uploadStream);
    } catch (error) {
        res.status(500).json({ message: 'Error creating event', error });
    }
};


// Update an event with optimized deletion logic
export const updateEvent = async (req, res) => {
    const { id } = req.params;
    const { title, description, category } = req.body;

    try {
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Prepare updates object
        const updates = {
            title: title || event.title,
            description: description || event.description,
            category: category || event.category,
        };

        // Handle image upload if a new image is provided
        if (req.files?.image) {
            // Create a readable stream from the file buffer
            const stream = new Readable();
            stream.push(req.files.image.data); // Using file.data for express-fileupload
            stream.push(null);

            // Upload new image to Cloudinary
            const uploadStream = cloudinary.v2.uploader.upload_stream(
                { folder: "events" },
                async (error, uploadResult) => {
                    if (error) {
                        return res.status(500).json({ message: "Error uploading image", error });
                    }

                    // Delete the previous image from Cloudinary
                    const publicId = event.imageUrl.split('/').pop().split('.')[0];
                    const fullPublicId = `events/${publicId}`; // Prepend 'event-assets/' to the public ID
                    await cloudinary.v2.uploader.destroy(fullPublicId);

                    // Update the event with the new image URL
                    updates.imageUrl = uploadResult.secure_url; // Update with new image URL

                    // Apply updates to the event
                    Object.assign(event, updates);
                    await event.save(); // Save the updated event

                    res.status(200).json({ message: "Event updated successfully", event });
                }
            );

            // Pipe the file to Cloudinary
            stream.pipe(uploadStream);
        } else {
            // If no new image is provided, just update the other fields
            Object.assign(event, updates); // Apply updates to the event
            await event.save();
            res.status(200).json({ message: 'Event updated successfully', event });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating event', error });
    }
};

// Delete an event with optimized deletion logic
export const deleteEvent = async (req, res) => {
    const { id } = req.params;

    try {
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Delete the image from Cloudinary using the logic provided
        if (event.imageUrl) {
            const imageUrl = event.imageUrl;

            // Extract the public ID from the image URL
            const splitUrl = imageUrl.split('/');
            const publicIdWithExtension = splitUrl[splitUrl.length - 1]; // e.g., 'your-public-id.jpg'
            const publicId = publicIdWithExtension.split('.')[0]; // Remove the file extension
            const fullPublicId = `events/${publicId}`; // Adjust folder structure as necessary

            // Delete the image from Cloudinary
            cloudinary.v2.uploader.destroy(fullPublicId, async (error, result) => {
                if (error) {
                    console.log("Error deleting image from Cloudinary:", error);
                    return res.status(500).json({ message: "Error deleting image from Cloudinary", error });
                }

                // console.log("Cloudinary deletion result:", result); // Log the result for debugging

                if (result.result !== 'ok') {
                    return res.status(500).json({ message: `Failed to delete image from Cloudinary: ${result.result}` });
                }

                // Respond with success
                res.status(200).json({ message: "Hero Page deleted successfully" });
            });
        }

        // Now delete the event from the database
        await Event.findByIdAndDelete(id);
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        console.log("Error deleting event:", error);
        res.status(500).json({ message: 'Error deleting event', error });
    }
};


// Get all events with optional category filtering
export const getAllEvents = async (req, res) => {
    const { categoryId } = req.query; 
   // console.log( categoryId);

   
    try {
        // Build the query object
        const query = categoryId ? { category: categoryId } : {}; 

        // Fetch events, optionally filtering by category and populating category details
        const events = await Event.find(query).populate('category'); // Populate category details

        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching events', error });
    }
};


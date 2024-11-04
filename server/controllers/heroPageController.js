import HeroPage from "../models/heroPageModel.js";
import cloudinary from 'cloudinary';
import { Readable } from 'stream';


// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});



// Create a Hero Page
export const createHeroPage = async (req, res) => {
    const { title, heading, description } = req.body;
    const file = req.files?.image; // Access the uploaded file

    if (!file) {
        return res.status(400).json({ message: "Image is required" });
    }

    try {
        // Create a readable stream from the file buffer
        const stream = new Readable();
        stream.push(file.data); // Using file.data for express-fileupload
        stream.push(null); // Signal the end of the stream

        // Upload the image to Cloudinary
        const uploadStream = cloudinary.v2.uploader.upload_stream(
            { folder: "event-assets" },
            async (error, result) => {
                if (error) {
                    return res.status(500).json({ message: "Error uploading image", error });
                }

                // Create the new hero page entry
                const heroPage = new HeroPage({
                    title,
                    heading,
                    description,
                    imageUrl: result.secure_url, // Save the Cloudinary URL

                });

                // Save to database
                await heroPage.save();

                res.status(201).json({ message: "Hero Page created successfully", heroPage });
            }
        );

        stream.pipe(uploadStream); // Pipe the stream to Cloudinary
    } catch (error) {
        res.status(500).json({ message: "Error creating Hero Page", error });
    }
};

// Update a Hero Page
export const updateHeroPage = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const heroPage = await HeroPage.findById(id);
        if (!heroPage) {
            return res.status(404).json({ message: "Hero Page not found" });
        }

        // Check if a new image is being uploaded
        if (req.files?.image) {
            // Create a readable stream from the file buffer
            const stream = new Readable();
            stream.push(req.files.image.data); // Using file.data for express-fileupload
            stream.push(null); // Signal the end of the stream

            // Upload new image to Cloudinary
            const uploadStream = cloudinary.v2.uploader.upload_stream(
                { folder: "event-assets" },
                async (error, result) => {
                    if (error) {
                        return res.status(500).json({ message: "Error uploading image", error });
                    }

                    // Delete the previous image from Cloudinary
                    const publicId = heroPage.imageUrl.split('/').pop().split('.')[0];
                    const fullPublicId = `event-assets/${publicId}`; // Prepend 'event-assets/' to the public ID
                    await cloudinary.v2.uploader.destroy(fullPublicId);

                    // Update the hero page with the new image URL
                    updates.imageUrl = result.secure_url; // Update with new image URL
                    Object.assign(heroPage, updates); // Apply updates to the hero page

                    await heroPage.save(); // Save the updated hero page

                    res.status(200).json({ message: "Hero Banner updated successfully", heroPage });
                }
            );

            stream.pipe(uploadStream); // Pipe the stream to Cloudinary
        } else {
            // Update the hero page without changing the image
            Object.assign(heroPage, updates);
            await heroPage.save();

            res.status(200).json({ message: "Hero Page updated successfully", heroPage });
        }
    } catch (error) {
        res.status(500).json({ message: "Error updating Hero Page", error });
    }
};

// Delete a Hero Page
export const deleteHeroPage = async (req, res) => {
    const { id } = req.params;

    try {
        const heroPage = await HeroPage.findById(id);
        if (!heroPage) {
            return res.status(404).json({ message: "Hero Page not found" });
        }



        // Check if videoUrl exists before trying to extract the public ID
        if (!heroPage.imageUrl) {
            return res.status(404).json({ message: "Image URL not found" });
        }

        // Extract the public ID dynamically from the image URL
        const imageUrl = heroPage.imageUrl;
        const publicIdWithExtension = imageUrl.split('/').pop(); // Get the last part of the URL
        const publicId = publicIdWithExtension.split('.')[0]; // Remove the file extension

        // Prepend 'event-assets/' to the public ID
        const fullPublicId = `event-assets/${publicId}`;
        console.log("Extracted publicId for deletion:", fullPublicId); // Log the publicId for debugging

        // Delete the image from Cloudinary
        cloudinary.v2.uploader.destroy(fullPublicId, async (error, result) => {
            if (error) {
                console.log("Error deleting image from Cloudinary:", error);
                return res.status(500).json({ message: "Error deleting image from Cloudinary", error });
            }

            console.log("Cloudinary deletion result:", result); // Log the result for debugging

            if (result.result !== 'ok') {
                return res.status(500).json({ message: `Failed to delete image from Cloudinary: ${result.result}` });
            }

            // Respond with success
            res.status(200).json({ message: "Hero Page deleted successfully" });
        });
        // Delete the hero page from the database
        await HeroPage.findByIdAndDelete(id);
    } catch (error) {
        res.status(500).json({ message: "Error deleting Hero Page", error });
    }
};


// Read all Hero Pages
export const getHeroPages = async (req, res) => {
    try {
        const heroPages = await HeroPage.find();
        res.status(200).json(heroPages);
    } catch (error) {
        res.status(500).json({ message: "Error fetching Hero Pages", error });
    }
};


// Read a specific Hero Page by ID
export const getHeroPageById = async (req, res) => {
    const { id } = req.params;

    try {
        const heroPage = await HeroPage.findById(id);
        if (!heroPage) {
            return res.status(404).json({ message: "Hero Page not found" });
        }
        res.status(200).json(heroPage);
    } catch (error) {
        res.status(500).json({ message: "Error fetching Hero Page", error });
    }
};

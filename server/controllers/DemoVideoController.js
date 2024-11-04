
import cloudinary from 'cloudinary';
import { Readable } from 'stream';
import Video from '../models/videoUrlModel.js';

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload a video
export const uploadVideo = async (req, res) => {
    const file = req.files?.video;

    // Validate the uploaded file
    if (!file) {
        return res.status(400).json({ message: "Video file is required" });
    }

    try {
        // Create a readable stream from the file buffer
        const stream = new Readable();
        stream.push(file.data); // Using file.data for express-fileupload
        stream.push(null); // Signal the end of the stream

        // Check if there's an existing video to delete
        const existingVideo = await Video.findOne();
        let existingVideoUrl;

        if (existingVideo) {
            existingVideoUrl = existingVideo.videoUrl; // Store the existing video URL for deletion
        }

        // Upload the new video to Cloudinary
        const uploadStream = cloudinary.v2.uploader.upload_stream(
            { resource_type: 'video', folder: "event-assets" },
            async (error, result) => {
                if (error) {
                    return res.status(500).json({ message: "Error uploading video", error });
                }

                // If there's an existing video, delete it from Cloudinary
                if (existingVideo) {
                    const publicId = existingVideoUrl.split('/').pop().split('.')[0];
                    await cloudinary.v2.uploader.destroy(publicId, { resource_type: 'video' });
                    // Update existing video entry
                    existingVideo.videoUrl = result.secure_url; // Save the new Cloudinary URL
                    await existingVideo.save();
                    return res.status(200).json({ message: "Video updated successfully", video: existingVideo });
                } else {
                    // Create new video entry
                    const newVideo = new Video({ videoUrl: result.secure_url });
                    await newVideo.save();
                    return res.status(201).json({ message: "Video uploaded successfully", video: newVideo });
                }
            }
        );

        stream.pipe(uploadStream); // Pipe the stream to Cloudinary
    } catch (error) {
        res.status(500).json({ message: "Error uploading video", error });
    }
};

// Get the video URL
export const getVideo = async (req, res) => {
    try {
        const videoEntry = await Video.findOne();
        if (!videoEntry) {
            return res.status(404).json({ message: "No video found" });
        }
        res.status(200).json({ videoUrl: videoEntry.videoUrl });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving video", error });
    }
};






// Delete a video
export const deleteDemoVideo = async (req, res) => {
 
    try {
        // Fetch video ID from request parameters or body (depending on your structure)
        //const { videoId } = req.params;

        // Find the video entry by its ID (or adjust this depending on how you're identifying videos)
        const videoEntry = await Video.findOne();


        // Check if a video entry exists
        if (!videoEntry) {
            return res.status(404).json({ message: "No video found to delete" });
        }

        // Check if videoUrl exists before trying to extract the public ID
        if (!videoEntry.videoUrl) {
            return res.status(404).json({ message: "Video URL not found" });
        }

        // Extract the public ID dynamically from the video URL
        const videoUrl = videoEntry.videoUrl;

        // Assuming the video URL is like: https://res.cloudinary.com/your-cloud-name/video/upload/v12345/your-public-id.mp4
        // Extract the last part after "upload/" which is the actual public ID
        const splitUrl = videoUrl.split('/');
        const publicIdWithExtension = splitUrl[splitUrl.length - 1]; // e.g., 'your-public-id.mp4'

        // Remove the file extension (.mp4) from the public ID
        const publicId = publicIdWithExtension.split('.')[0];

        // Prepend the 'event-assets/' to the public ID as needed
        const fullPublicId = `event-assets/${publicId}`;
      

        // Delete the video from Cloudinary (ensure resource_type is 'video')
        cloudinary.v2.uploader.destroy(fullPublicId, { resource_type: 'video' }, async (error, result) => {
            if (error) {
                console.log("Error deleting video from Cloudinary:", error);
                return res.status(500).json({ message: "Error deleting video from Cloudinary", error });
            }

            console.log("Cloudinary deletion result:", result); // Log the result for debugging

            if (result.result !== 'ok') {
                return res.status(500).json({ message: `Failed to delete video from Cloudinary: ${result.result}` });
            }

            // Remove the video entry from the database using findByIdAndDelete
            await Video.findByIdAndDelete(videoEntry._id);

            res.status(200).json({ message: "Video deleted successfully" });
        });
    } catch (error) {
        console.log("Error deleting video:", error);
        res.status(500).json({ message: "Error deleting video", error });
    }
};



import cloudinary from 'cloudinary';
import { Readable } from 'stream';
import Founder from '../models/FounderModel.js';


// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Helper function to upload image to Cloudinary
const uploadImageToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    const stream = new Readable();
    stream.push(file.data);
    stream.push(null);

    const uploadStream = cloudinary.v2.uploader.upload_stream({ folder: 'content' }, (error, uploadResult) => {
      if (error) return reject(error);
      resolve(uploadResult.secure_url); // Resolve with image URL
    });

    stream.pipe(uploadStream);
  });
};

// Create new content
export const createContent = async (req, res) => {
  const { name, content1, content2 } = req.body;
  const file = req.files?.image;

  

 

  try {
    const imageUrl = await uploadImageToCloudinary(file);
    const newContent = new Founder({
      name,
      content1,
      content2,
      image: imageUrl,
    });

    await newContent.save();
    res.status(201).json({ message: "Content created successfully", newContent });
  } catch (error) {
    res.status(500).json({ message: 'Error creating content', error });
  }
};

// Get all content
export const getAllContent = async (req, res) => {
  try {
    const contents = await Founder.find();
    res.status(200).json(contents);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contents', error });
  }
};


// Update content
export const updateContent = async (req, res) => {
  const { id } = req.params;
  const { name, content1, content2 } = req.body;
  const file = req.files?.image;

  try {
    const existingContent = await Founder.findById(id);
    if (!existingContent) {
      return res.status(404).json({ message: "Content not found" });
    }

    const updates = {
      name: name || existingContent.name,
      content1: content1 || existingContent.content1,
      content2: content2 || existingContent.content2,
    };

    if (file) {
      // Delete old image from Cloudinary
      const publicId = existingContent.image.split('/').pop().split('.')[0]; // Extract publicId from URL
      await cloudinary.v2.uploader.destroy(`content/${publicId}`);

      // Upload new image
      const newImageUrl = await uploadImageToCloudinary(file);
      updates.image = newImageUrl; // Update image URL
    }

    Object.assign(existingContent, updates);
    await existingContent.save();

    res.status(200).json({ message: "Content updated successfully", existingContent });
  } catch (error) {
    res.status(500).json({ message: 'Error updating content', error });
  }
};

// Delete content
export const deleteContent = async (req, res) => {
  const { id } = req.params;

  try {
    const content = await Founder.findById(id);
    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }

    // Delete image from Cloudinary
    const publicId = content.image.split('/').pop().split('.')[0]; // Extract publicId from URL
    await cloudinary.v2.uploader.destroy(`content/${publicId}`);

    // Delete the content from MongoDB
    await content.remove();
    res.status(200).json({ message: "Content deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting content', error });
  }
};

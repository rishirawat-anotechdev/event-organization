import cloudinary from 'cloudinary';
import { Readable } from 'stream';
import Blog from '../models/blogModel.js';



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
      resolve(uploadResult.secure_url);
    });

    stream.pipe(uploadStream);
  });
};

// Create content
export const createContent = async (req, res) => {
  const { title, videoUrl } = req.body;
  const file = req.files?.image;

  if (!title || !videoUrl || !file) {
    return res.status(400).json({ message: "All fields (title, videoUrl, image) are required." });
  }

  try {
    const imageUrl = await uploadImageToCloudinary(file);
    const newContent = new Blog({
      title,
      imageUrl,
      videoUrl,
    });

    await newContent.save();
    res.status(201).json({ message: "Content created successfully", newContent });
  } catch (error) {
    res.status(500).json({ message: 'Error creating content', error });
  }
};

// Read all content
export const getAllContent = async (req, res) => {
  try {
    const contentList = await Blog.find();
    res.status(200).json(contentList);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching content', error });
  }
};

// // Read single content by ID
// export const getContentById = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const content = await Content.findById(id);
//     if (!content) {
//       return res.status(404).json({ message: "Content not found" });
//     }
//     res.status(200).json(content);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching content', error });
//   }
// };

// Update content
export const updateContent = async (req, res) => {
  const { id } = req.params;
  const { title, videoUrl } = req.body;

  try {
    const content = await Blog.findById(id);
    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }

    const updates = {
      title: title || content.title,
      videoUrl: videoUrl || content.videoUrl,
    };

    // If a new image is provided, handle the image update
    if (req.files?.image) {
      const file = req.files.image;

      // Delete old image from Cloudinary
      const publicId = content.imageUrl.split('/').pop().split('.')[0]; // Extract publicId from URL
      await cloudinary.v2.uploader.destroy(`content/${publicId}`);

      // Upload new image to Cloudinary
      const imageUrl = await uploadImageToCloudinary(file);
      updates.imageUrl = imageUrl; // Update the imageUrl in the updates object
    }

    Object.assign(content, updates);
    await content.save();

    res.status(200).json({ message: "Content updated successfully", content });
  } catch (error) {
    res.status(500).json({ message: 'Error updating content', error });
  }
};

// Delete content
export const deleteContent = async (req, res) => {
  const { id } = req.params;

  try {
    const content = await Blog.findById(id);
    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }
   
    // Delete image from Cloudinary
    const publicId = content.imageUrl.split('/').pop().split('.')[0]; // Extract publicId from URL
    await cloudinary.v2.uploader.destroy(`content/${publicId}`);
 
    // Delete the content from MongoDB
    await content.remove();
    res.status(200).json({ message: "Content deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting content', error });
  }
};

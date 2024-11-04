import AboutUs from "../models/aboutUsModel.js";


// Create About Us section
export const createAboutUs = async (req, res) => {
    const { heading, content, completedProjects, originalConcepts, regularCustomers, yearsOfExperience } = req.body;

    // Validate input
    if (!heading || !content || !completedProjects || !originalConcepts || !regularCustomers || !yearsOfExperience) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        const newAboutUs = new AboutUs({
            heading,
            content,
            completedProjects,
            originalConcepts,
            regularCustomers,
            yearsOfExperience,
        });

        await newAboutUs.save();
        res.status(201).json({ message: "About Us section created successfully", newAboutUs });
    } catch (error) {
        res.status(500).json({ message: 'Error creating About Us section', error });
    }
};

// Get About Us section
export const getAboutUs = async (req, res) => {
    try {
        const aboutUsSection = await AboutUs.findOne();
        if (!aboutUsSection) {
            return res.status(404).json({ message: "About Us section not found." });
        }
        res.status(200).json(aboutUsSection);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching About Us section', error });
    }
};

// Update About Us section
export const updateAboutUs = async (req, res) => {
    const { heading, content, completedProjects, originalConcepts, regularCustomers, yearsOfExperience } = req.body;

    try {
        const updates = {
            heading,
            content,
            completedProjects,
            originalConcepts,
            regularCustomers,
            yearsOfExperience,
        };

        const updatedAboutUs = await AboutUs.findOneAndUpdate({}, updates, { new: true, runValidators: true });
        if (!updatedAboutUs) {
            return res.status(404).json({ message: "About Us section not found." });
        }

        res.status(200).json({ message: "About Us section updated successfully", updatedAboutUs });
    } catch (error) {
        res.status(500).json({ message: 'Error updating About Us section', error });
    }
};

// Create About Us section
export const deleteAboutUs = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedAboutUs = await AboutUs.deleteOne({ _id: id });

        // Check if the document was found and deleted
        if (deletedAboutUs.deletedCount === 0) {
            return res.status(404).json({ message: "About Us section not found" });
        }

        res.status(200).json({ message: "About Us section deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting About Us section', error });
    }
};


import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// Register admin
export const registerAdmin = async (req, res) => {
  const { fullName, email, password, isAdmin } = req.body;

  try {
    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new User({ fullName, email, password: hashedPassword,  isAdmin });
    await newAdmin.save();

    const token = jwt.sign({ id: newAdmin._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

   res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", 
    sameSite: "none",  
    maxAge: 24 * 60 * 60 * 1000  
});


    res.status(201).json({
         newAdmin,
         message: "Admin registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Login admin
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;


  try {
    const admin = await User.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", 
    sameSite: "none",  
    maxAge: 24 * 60 * 60 * 1000  
});
    const adminData = admin.toObject();
    delete adminData.password;

    res.status(200).json({ 
        user:adminData,
        token,
        message: "Admin logged in successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

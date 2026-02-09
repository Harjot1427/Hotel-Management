import cloudinary from "../config/cloudinary.js";
import Contribute from "../models/Contribute.js";

export const contributePostController = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image file is required." });
    }
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "contributions",
      use_filename: true,
      unique_filename: false,
    });

    const newContribute = new Contribute({
      title,
      description,
      image: uploadResult.secure_url,
      category,
      postedBy: req.user.id,
      createdAt: new Date(),
    });

    const savedContribute = await newContribute.save();

    res.status(201).json({
      message: "Contribution created successfully.",
      contribute: {
        ...savedContribute.toObject(),
        createdAt: savedContribute.createdAt,
      },
    });
  } catch (error) {
    console.error("Error creating contribution:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

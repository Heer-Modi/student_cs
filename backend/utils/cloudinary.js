const cloudinary = require('cloudinary').v2;
const fs = require('fs');

// Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        // Upload file to Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "image",
        });

        console.log("File successfully uploaded to Cloudinary:", response.url);
        return response;
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        return null;
    } finally {
        // Optional: Delete the local file after upload if needed
        fs.unlinkSync(localFilePath);
    }
};


module.exports = uploadOnCloudinary;

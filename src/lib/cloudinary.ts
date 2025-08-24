import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary using the CLOUDINARY_URL environment variable.
// The URL should follow the format cloudinary://<api_key>:<api_secret>@<cloud_name>
cloudinary.config({
  secure: true,
});

/**
 * Upload a file buffer to Cloudinary.
 * @param buffer The file buffer to upload.
 * @param folder Optional folder name for organizing uploads.
 * @returns The secure URL of the uploaded file.
 */
export async function uploadToCloudinary(buffer: Buffer, folder?: string) {
  return new Promise<string>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error || !result) {
          return reject(error);
        }
        resolve(result.secure_url);
      }
    );
    uploadStream.end(buffer);
  });
}
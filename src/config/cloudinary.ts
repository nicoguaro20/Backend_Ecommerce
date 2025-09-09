import { v2 as cloudinary } from 'cloudinary';
import { ConfigOptions } from 'cloudinary';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env' });

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const cloudinaryConfig = {
    provide: 'CLOUDINARY',
    useFactory: (): ConfigOptions => cloudinary,
};
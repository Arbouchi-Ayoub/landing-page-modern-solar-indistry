import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const SOURCE_DIR = path.join(__dirname, '../public/images');
const DEST_DIR = path.join(__dirname, '../public/optimized-images');
const QUALITY = 80; // Quality setting (0-100)
const WIDTHS = [400, 800, 1200, 1600]; // Different widths for responsive images

// Supported image extensions
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

// Create optimized versions of images
async function optimizeImages() {
  try {
    // Create destination directory if it doesn't exist
    await fs.mkdir(DEST_DIR, { recursive: true });

    // Read all files from source directory
    const files = await fs.readdir(SOURCE_DIR);
    
    // Filter for image files
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return IMAGE_EXTENSIONS.includes(ext);
    });

    console.log(`Found ${imageFiles.length} images to optimize`);

    // Process each image
    for (const file of imageFiles) {
      const inputPath = path.join(SOURCE_DIR, file);
      const ext = path.extname(file).toLowerCase();
      const name = path.basename(file, ext);
      
      console.log(`Processing: ${file}`);
      
      // Create WebP version
      const webpOutput = path.join(DEST_DIR, `${name}.webp`);
      await sharp(inputPath)
        .webp({ quality: QUALITY })
        .toFile(webpOutput);
      
      console.log(`Created: ${path.basename(webpOutput)}`);
      
      // Create responsive versions for JPG/PNG
      if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
        for (const width of WIDTHS) {
          const outputName = `${name}-${width}w${ext}`;
          const outputPath = path.join(DEST_DIR, outputName);
          
          await sharp(inputPath)
            .resize({ width, withoutEnlargement: true })
            [ext === '.png' ? 'png' : 'jpeg']({ 
              quality: QUALITY,
              mozjpeg: true,
              progressive: true
            })
            .toFile(outputPath);
            
          console.log(`Created: ${outputName}`);
        }
      }
    }
    
    // Optimize all images in the destination directory
    await imagemin([`${DEST_DIR}/*.{jpg,jpeg,png,webp}`], {
      destination: DEST_DIR,
      plugins: [
        imageminMozjpeg({
          quality: QUALITY,
          progressive: true
        }),
        imageminPngquant({
          quality: [0.6, 0.8],
          speed: 4
        }),
        imageminWebp({
          quality: QUALITY,
          method: 6
        })
      ]
    });
    
    console.log('Image optimization complete!');
    
  } catch (error) {
    console.error('Error optimizing images:', error);
    process.exit(1);
  }
}

// Run the optimization
optimizeImages().catch(console.error);

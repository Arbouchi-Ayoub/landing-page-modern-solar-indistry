const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const sharp = require('sharp');

// Create images directory if it doesn't exist
const imagesDir = path.join(__dirname, '../public/images/hero');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
  console.log('Created hero images directory');
}

// Hero image URLs (using placeholder URLs - replace with actual image URLs)
const heroImages = [
  {
    url: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1772&q=80',
    filename: 'hero-1.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1774&q=80',
    filename: 'hero-2.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    filename: 'hero-3.jpg'
  }
];

async function downloadAndOptimizeImages() {
  console.log('Starting image download and optimization...');
  
  for (const image of heroImages) {
    const outputPath = path.join(imagesDir, image.filename);
    
    try {
      // Download image
      console.log(`Downloading ${image.url}...`);
      const response = await fetch(image.url);
      const buffer = await response.buffer();
      
      // Optimize image with sharp
      console.log(`Optimizing ${image.filename}...`);
      await sharp(buffer)
        .resize(1920, 1080, {
          fit: 'cover',
          position: 'center'
        })
        .jpeg({ 
          quality: 80,
          progressive: true,
          mozjpeg: true
        })
        .toFile(outputPath);
        
      console.log(`✅ Successfully processed ${image.filename}`);
    } catch (error) {
      console.error(`❌ Error processing ${image.filename}:`, error.message);
    }
  }
  
  console.log('\nAll images have been processed!');
}

// Run the function
downloadAndOptimizeImages().catch(console.error);

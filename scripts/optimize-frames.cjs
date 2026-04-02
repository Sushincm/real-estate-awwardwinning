const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '../public/banner-frames');
const outputDir = path.join(__dirname, '../public/banner-frames');

if (!fs.existsSync(inputDir)) {
    console.error('❌ Could not find public/banner-frames directory!');
    process.exit(1);
}

const optimizeImages = async () => {
    console.log('🚀 Starting "Award Winning" optimization for 240 frames...');
    
    const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.jpg'));
    let count = 0;

    if (files.length === 0) {
        console.warn('⚠️ No .jpg frames found in public/banner-frames!');
        return;
    }

    for (const file of files) {
        const inputPath = path.join(inputDir, file);
        const outputPath = path.join(outputDir, file.replace('.jpg', '.webp'));
        
        await sharp(inputPath)
            .webp({ quality: 60, effort: 6 }) // Aggressive compression for 5s mobile target
            .toFile(outputPath);
            
        count++;
        if (count % 20 === 0) console.log(`⏩ Processed ${count} of ${files.length} frames...`);
    }

    console.log(`✅ COMPLETE! Converted ${count} frames to ultra-fast .webp format.`);
    console.log('💡 Remember to update constants/frames.js extension to .webp');
};

optimizeImages().catch(err => console.error('❌ Error during optimization:', err));

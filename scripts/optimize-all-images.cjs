const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

/**
 * Universal Image Optimizer Script
 * - Converts all .jpg, .jpeg, .png to .webp
 * - Compresses them for fast performance
 * - Removes original files after successful conversion
 */

const directories = [
    path.join(__dirname, '../public'),
    path.join(__dirname, '../public/banner-frames'),
    path.join(__dirname, '../public/showcase')
];

const optimize = async () => {
    console.log('🚀 Starting "Global Image Compression" with Sharp...');
    let totalProcessed = 0;

    for (const dir of directories) {
        if (!fs.existsSync(dir)) {
            console.log(`⏩ Skipping non-existent directory: ${dir}`);
            continue;
        }

        console.log(`\n📂 Scanning: ${path.relative(process.cwd(), dir)}`);
        const files = fs.readdirSync(dir).filter(f => 
            /\.(jpg|jpeg|png)$/i.test(f)
        );

        if (files.length === 0) {
            console.log('✨ No heavy images found here.');
            continue;
        }

        for (const file of files) {
            const inputPath = path.join(dir, file);
            const ext = path.extname(file);
            const baseName = path.basename(file, ext);
            const outputPath = path.join(dir, `${baseName}.webp`);

            try {
                process.stdout.write(`⚡ Optimizing ${file}... `);
                
                await sharp(inputPath)
                    .webp({ quality: 75, effort: 6 }) // High quality for static images (frames use 60)
                    .toFile(outputPath);
                
                // Cleanup: Remove original
                fs.unlinkSync(inputPath);
                
                console.log('✅ Done (WebP Created)');
                totalProcessed++;
            } catch (err) {
                console.log(`❌ ERROR: Could not process ${file}`);
            }
        }
    }

    console.log(`\n🎉 FINAL COMPLETE! Cleaned and converted ${totalProcessed} images to ultra-fast .webp format.`);
};

optimize().catch(err => console.error('\n❌ Critical Error during global optimization:', err));

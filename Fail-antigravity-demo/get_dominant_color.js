function getDominantColor() {
    const images = document.images;
    if (!images || images.length === 0) return 'No images';

    // Find the logo image (assuming it's loaded and has an alt 'BBS Mart' or 'logo')
    const img = Array.from(images).find(i => i.src.includes('logo') || i.alt.includes('BBS'));
    if (!img) return 'No logo found';

    if (!img.complete) return 'Image not loaded yet';

    try {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, img.width, img.height);

        // Sample a few pixels to find a dominant one (simple approach) or average
        // Better: Average the center
        const checkX = Math.floor(img.width / 2);
        const checkY = Math.floor(img.height / 2);

        const pixel = ctx.getImageData(checkX, checkY, 1, 1).data;

        // Convert to hex
        const hex = '#' + ((1 << 24) + (pixel[0] << 16) + (pixel[1] << 8) + pixel[2]).toString(16).slice(1);

        return {
            center: hex,
            rgb: `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`
        };
    } catch (e) {
        return 'CORS/Error: ' + e.message;
    }
}
return getDominantColor();

// North America Night Lights - Image-based Canvas 2D Effect
// Uses a NASA-style night map image as the data source for pixel-perfect detail.
// Default: very dim/transparent dots. Mouse hover: warm yellow city light glow.

(function () {
    const canvas = document.getElementById('constellation-bg');
    const ctx = canvas.getContext('2d');

    let width, height;
    let imageData = null;     // The raw pixel data of the source image
    let imgWidth, imgHeight;
    let mouseX = -9999, mouseY = -9999;
    let prevLitPixels = [];   // Track previously lit pixels for fade-out
    const HOVER_RADIUS = 120; // Radius of the "satellite spotlight" in canvas pixels
    const FADE_SPEED = 0.75;  // How fast dots return to dark (0-1 per frame)
    let brightnessMap = null; // Float32Array: brightness per pixel of source

    // Resize canvas to fill window
    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }

    // Load the night map image and extract pixel data
    function loadNightMap() {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = function () {
            imgWidth = img.width;
            imgHeight = img.height;

            // Draw image onto an offscreen canvas to read pixel data
            const offscreen = document.createElement('canvas');
            offscreen.width = imgWidth;
            offscreen.height = imgHeight;
            const offCtx = offscreen.getContext('2d');
            offCtx.drawImage(img, 0, 0);
            imageData = offCtx.getImageData(0, 0, imgWidth, imgHeight);

            // Precompute brightness map
            const data = imageData.data;
            brightnessMap = new Float32Array(imgWidth * imgHeight);
            for (let i = 0; i < imgWidth * imgHeight; i++) {
                const r = data[i * 4];
                const g = data[i * 4 + 1];
                const b = data[i * 4 + 2];
                // Perceived luminance
                brightnessMap[i] = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
            }

            // Initialize the glow state array (stores current glow level per grid cell)
            initGlowState();
            startAnimation();
        };
        img.src = 'nightmap.png';
    }

    // Grid state: each pixel tracks its current "glow" level (0 = dark, 1 = fully lit)
    let glowState = null;
    let gridW, gridH;

    function initGlowState() {
        gridW = width;
        gridH = height;
        glowState = new Float32Array(width * height);
    }

    function startAnimation() {
        requestAnimationFrame(render);
    }

    function render() {
        requestAnimationFrame(render);

        if (!brightnessMap || !glowState) return;

        // Use ImageData for direct pixel manipulation (single putImageData vs millions of fillRect)
        const frameData = ctx.createImageData(width, height);
        const pixels = frameData.data; // Uint8ClampedArray [r,g,b,a, r,g,b,a, ...]

        // Scale factors: map image coords to canvas coords
        const scaleX = imgWidth / width;
        const scaleY = imgHeight / height;
        const hoverRadiusSq = HOVER_RADIUS * HOVER_RADIUS; // Avoid sqrt

        for (let y = 0; y < height; y++) {
            const imgY = Math.floor(y * scaleY);
            if (imgY >= imgHeight) continue;
            const imgRowOffset = imgY * imgWidth;

            for (let x = 0; x < width; x++) {
                const imgX = Math.floor(x * scaleX);
                if (imgX >= imgWidth) continue;

                const brightness = brightnessMap[imgRowOffset + imgX];

                // Skip fully dark pixels (ocean/space)
                if (brightness < 0.04) continue;

                const idx = y * width + x;

                // Squared distance to mouse (no sqrt needed)
                const dx = x - mouseX;
                const dy = y - mouseY;
                const distSq = dx * dx + dy * dy;

                // Glow state update — only light up bright pixels (cities), not dim land
                if (distSq < hoverRadiusSq && brightness > 0.15) {
                    const dist = Math.sqrt(distSq); // Only sqrt for pixels near mouse
                    const intensity = 1.0 - (dist / HOVER_RADIUS);
                    const targetGlow = intensity * intensity * intensity; // cubic falloff
                    glowState[idx] += (targetGlow - glowState[idx]) * 0.15;
                } else {
                    if (glowState[idx] > 0) {
                        glowState[idx] *= (1.0 - FADE_SPEED);
                        if (glowState[idx] < 0.005) glowState[idx] = 0;
                    }
                }

                const glow = glowState[idx];
                const pixelOffset = idx * 4;

                if (glow > 0.01) {
                    // Lit state: bright warm yellow-white
                    const litIntensity = Math.min(1.0, glow * brightness * 1.8);
                    pixels[pixelOffset] = 255 * litIntensity | 0;
                    pixels[pixelOffset + 1] = 220 * litIntensity | 0;
                    pixels[pixelOffset + 2] = 100 * litIntensity | 0;
                    pixels[pixelOffset + 3] = Math.min(255, (litIntensity * 3.0 + 0.15) * 255) | 0;
                } else {
                    // Dark state: subtle continent outline
                    pixels[pixelOffset] = 60 * brightness | 0;
                    pixels[pixelOffset + 1] = 70 * brightness | 0;
                    pixels[pixelOffset + 2] = 100 * brightness | 0;
                    pixels[pixelOffset + 3] = brightness * 0.6 * 255 | 0;
                }
            }
        }

        ctx.putImageData(frameData, 0, 0);
    }

    // Mouse tracking
    function onMouseMove(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }

    function onMouseLeave() {
        mouseX = -9999;
        mouseY = -9999;
    }

    // Init
    function init() {
        resize();
        // Mouse tracking via document, canvas stays pointer-events: none
        document.addEventListener('mousemove', onMouseMove, false);
        document.addEventListener('mouseleave', onMouseLeave, false);
        window.addEventListener('resize', () => {
            resize();
            initGlowState();
        });
        loadNightMap();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

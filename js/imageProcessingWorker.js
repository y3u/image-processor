importScripts('https://cdnjs.cloudflare.com/ajax/libs/jimp/0.16.1/jimp.min.js');

self.onmessage = async function(e) {
    const { files, options } = e.data;
    const processedImages = [];

    try {
        for (const file of files) {
            const imageBuffer = await readFileAsArrayBuffer(file);
            const processedImage = await processImage(imageBuffer, options);
            processedImages.push({
                name: file.name,
                data: processedImage
            });
        }
        self.postMessage({ processedImages });
    } catch (error) {
        self.postMessage({ error: error.message });
    }
};

async function readFileAsArrayBuffer(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => resolve(event.target.result);
        reader.onerror = (error) => reject(error);
        reader.readAsArrayBuffer(file);
    });
}

async function processImage(imageBuffer, options) {
    const image = await Jimp.read(imageBuffer);

    if (options.resize) {
        image.resize(options.resize.width, options.resize.height);
    }

    if (options.reduceColors) {
        image.posterize(options.reduceColors);
    }

    if (options.crop) {
        image.crop(options.crop.x, options.crop.y, options.crop.width, options.crop.height);
    }

    if (options.adjustments) {
        image.brightness(options.adjustments.brightness / 100)
             .contrast(options.adjustments.contrast / 100)
             .color([
                 { apply: 'saturate', params: [options.adjustments.saturation / 100] }
             ]);
    }

    // 背景削除は複雑なため、ここでは実装していません。
    // 実際には専用のライブラリや API を使用する必要があります。

    return await image.getBase64Async(Jimp.MIME_PNG);
}

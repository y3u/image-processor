let currentFiles = [];

function handleFiles(files) {
    currentFiles = Array.from(files);
    updateImagePreview();
}

function updateImagePreview() {
    const imagePreview = document.getElementById('image-preview');
    imagePreview.innerHTML = '';
    
    currentFiles.forEach(file => {
        const img = document.createElement('img');
        img.src = URL.createObjectURL(file);
        imagePreview.appendChild(img);
    });
}

async function processImages() {
    try {
        const options = getProcessingOptions();
        const processedImages = await processImagesWithWorker(currentFiles, options);
        updateImagePreview(processedImages);
    } catch (error) {
        showErrorMessage(`処理中にエラーが発生しました: ${error.message}`);
    }
}

function getProcessingOptions() {
    return {
        resize: document.getElementById('resize-option').checked ? {
            width: parseInt(document.getElementById('resize-width').value),
            height: parseInt(document.getElementById('resize-height').value)
        } : null,
        reduceColors: document.getElementById('reduce-colors-option').checked ?
            parseInt(document.getElementById('color-count').value) : null,
        removeBackground: document.getElementById('remove-bg-option').checked,
        crop: document.getElementById('crop-option').checked ? {
            x: parseInt(document.getElementById('crop-x').value),
            y: parseInt(document.getElementById('crop-y').value),
            width: parseInt(document.getElementById('crop-width').value),
            height: parseInt(document.getElementById('crop-height').value)
        } : null,
        adjustments: {
            brightness: parseInt(document.getElementById('brightness').value),
            contrast: parseInt(document.getElementById('contrast').value),
            saturation: parseInt(document.getElementById('saturation').value)
        }
    };
}

function showErrorMessage(message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    document.body.appendChild(errorElement);
    setTimeout(() => document.body.removeChild(errorElement), 5000);
}

async function saveProcessedImages() {
    const imagePreview = document.getElementById('image-preview');
    const images = imagePreview.getElementsByTagName('img');

    for (let i = 0; i < images.length; i++) {
        const imageData = images[i].src.split(',')[1];
        const fileName = `processed_image_${i + 1}.png`;
        
        try {
            const blob = base64ToBlob(imageData);
            saveAs(blob, fileName);
        } catch (error) {
            showErrorMessage(`画像の保存中にエラーが発生しました: ${error.message}`);
        }
    }
}

function base64ToBlob(base64) {
    const binaryString = window.atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return new Blob([bytes], {type: 'image/png'});
}

// FileSaver.js ライブラリの saveAs 関数を使用
// https://github.com/eligrey/FileSaver.js/

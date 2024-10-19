document.addEventListener('DOMContentLoaded', () => {
    initializeDarkMode();
    initializeFileHandlers();
    initializeProcessingHandlers();
    initializeUIControls();
});

function initializeDarkMode() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });

    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
}

function initializeFileHandlers() {
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const selectFilesBtn = document.getElementById('select-files');

    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('drag-over');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('drag-over');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');
        handleFiles(e.dataTransfer.files);
    });

    selectFilesBtn.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
        handleFiles(e.target.files);
    });
}

function initializeProcessingHandlers() {
    const processBtn = document.getElementById('process-btn');
    const saveBtn = document.getElementById('save-btn');

    processBtn.addEventListener('click', processImages);
    saveBtn.addEventListener('click', saveProcessedImages);
}

function initializeUIControls() {
    // ここにUIコントロールの初期化コードを追加
    // 例: スライダーの値を表示する、オプションの切り替えなど
}

let apiKey = '';

function initializeSettings() {
    apiKey = localStorage.getItem('removeBgApiKey');
    if (!apiKey) {
        showApiKeyPrompt();
    }
}

function showApiKeyPrompt() {
    const promptContainer = document.createElement('div');
    promptContainer.id = 'api-key-prompt';
    promptContainer.innerHTML = `
        <div class="modal">
            <h2>Remove.bg API キーの設定</h2>
            <p>背景削除機能を使用するには、Remove.bg API キーが必要です。</p>
            <input type="text" id="api-key-input" placeholder="API キーを入力">
            <button id="save-api-key">保存</button>
        </div>
    `;
    document.body.appendChild(promptContainer);

    document.getElementById('save-api-key').addEventListener('click', saveApiKey);
}

function saveApiKey() {
    const input = document.getElementById('api-key-input');
    apiKey = input.value.trim();
    if (apiKey) {
        localStorage.setItem('removeBgApiKey', apiKey);
        document.body.removeChild(document.getElementById('api-key-prompt'));
    } else {
        alert('有効な API キーを入力してください。');
    }
}

function getApiKey() {
    return apiKey;
}

// 設定の初期化
document.addEventListener('DOMContentLoaded', initializeSettings);

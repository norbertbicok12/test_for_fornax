class FileUploadComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.fileData = null;
        this.maxFileSize = 5 * 1024 * 1024;
        this.render();
    }

    // Rendering file selection style.
    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    font-family: Arial, sans-serif;
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    width: 40%;
                    transform: translate(-50%, -50%);
                    align-items: center;
                    justify-content: center;
                }
                input[readonly] {
                    width: 100%;
                    padding: 5px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    background: #f9f9f9;
                }
                button {
                    padding: 8px 12px;
                    border: none;
                    cursor: pointer;
                    border-radius: 4px;
                }
                .buttons {
                    display: flex;
                    flex-direction: row;
                    gap: 10px;
                    justify-content: center;
                }
                .upload-btn {
                    background: #4CAF50;
                    color: white;
                }
                .remove-btn {
                    background: #f44336;
                    color: white;
                    display: none;
                }
                .file-info {
                    margin: 25px 0;
                    font-size: 14px;
                    color: #333;
                    line-height: 1.8;
                }
            </style>
            <h1>Upload a File</h1>
            <input type="text" readonly placeholder="No file chosen" />
            <input type="file" hidden />
            <div class="buttons"> 
                <button class="upload-btn">Upload</button>
                <button class="remove-btn">Remove</button>
            </div>
            <div class="file-info"></div>
        `;

        this.inputField = this.shadowRoot.querySelector('input[type="text"]');
        this.fileInput = this.shadowRoot.querySelector('input[type="file"]');
        this.uploadButton = this.shadowRoot.querySelector('.upload-btn');
        this.removeButton = this.shadowRoot.querySelector('.remove-btn');
        this.fileInfoDiv = this.shadowRoot.querySelector('.file-info');

        this.uploadButton.addEventListener('click', () => this.fileInput.click());
        this.fileInput.addEventListener('change', (e) => this.handleFileSelect(e));
        this.removeButton.addEventListener('click', () => this.removeFile());
    }

    // Handling file selection
    handleFileSelect(event) {
        const file = event.target.files[0];
        if (!file) return;

        // File reader
        const reader = new FileReader();


        // File size validation
        if(file.size > this.maxFileSize) {
            alert('File size exceeds 5MB limit.');
            this.removeFile();
            return;
        }

        reader.onload = () => {
            this.fileData = {
                name: file.name,
                type: file.type,
                size: file.size,
                base64: reader.result.split(',')[1]
            };

            // Displaying file name
            this.inputField.value = file.name;

            // Displaying file info
            this.fileInfoDiv.innerHTML = `
                <strong>Name:</strong> ${this.fileData.name}<br>
                <strong>Type:</strong> ${this.fileData.type}<br>
                <strong>Size:</strong> ${this.fileData.size} bytes<br>
                <strong>Base64:</strong> ${this.fileData.base64.substring(0, 75)}... (truncated)
            `;

            // Displaying remove button
            this.removeButton.style.display = 'block';

            // Disabling upload button
            this.uploadButton.disabled = true;
        };
        reader.readAsDataURL(file);
    }

    // Removing file
    removeFile() {
        this.fileData = null;
        this.inputField.value = '';
        this.fileInput.value = '';
        this.fileInfoDiv.innerHTML = '';
        this.removeButton.style.display = 'none';
        this.uploadButton.disabled = false;
    }
}

customElements.define('file-upload-component', FileUploadComponent);
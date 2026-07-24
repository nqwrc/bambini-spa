export function initFileUpload() {
  const dropzone = document.getElementById('cv-dropzone');
  const fileInput = document.getElementById('cv-file-input');
  const fileNameDisplay = document.getElementById('cv-file-name');

  if (!dropzone || !fileInput) return;

  ['dragenter', 'dragover'].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.add('drag-over', 'border-secondary', 'bg-secondary/5');
    }, false);
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.remove('drag-over', 'border-secondary', 'bg-secondary/5');
    }, false);
  });

  dropzone.addEventListener('drop', (e) => {
    const dt = e.dataTransfer;
    const files = dt.files;
    if (files.length) {
      fileInput.files = files;
      updateFileName(files[0].name);
    }
  });

  fileInput.addEventListener('change', () => {
    if (fileInput.files.length) {
      updateFileName(fileInput.files[0].name);
    }
  });

  function updateFileName(name) {
    if (fileNameDisplay) {
      fileNameDisplay.textContent = `File selezionato: ${name}`;
      fileNameDisplay.classList.remove('hidden');
      fileNameDisplay.classList.add('text-secondary', 'font-bold');
    }
  }
}

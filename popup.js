document.addEventListener('DOMContentLoaded', () => {
  const fileInput = document.getElementById('fileInput');
  const fileContent = document.getElementById('fileContent');

  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const arrayBuffer = event.target.result;
        const result = await mammoth.extractRawText({arrayBuffer: arrayBuffer});
        fileContent.textContent = result.value;
      } catch (error) {
        fileContent.textContent = `Error: ${error.message}`;
      }
    };

    reader.readAsArrayBuffer(file);
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.getElementById("fileInput");
  const fileContent = document.getElementById("fileContent");
  const crossButton = document.getElementById("crossButton");

  // Handle file upload
  fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const arrayBuffer = event.target.result;
        const result = await mammoth.extractRawText({
          arrayBuffer: arrayBuffer
        });
        fileContent.textContent = result.value;
        crossButton.style.display = "block"; // Show cross button
      } catch (error) {
        fileContent.textContent = `Error: ${error.message}`;
      }
    };

    reader.readAsArrayBuffer(file);
  });

  // Handle cross button click
  crossButton.addEventListener("click", () => {
    fileInput.value = ""; // Clear file input
    fileContent.textContent = ""; // Clear content
    crossButton.style.display = "none"; // Hide cross button
  });

  // Hide cross button initially
  crossButton.style.display = "none";
});

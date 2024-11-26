console.log("Homey Home")
async function injectAndSummarizeText(selectedText) {
    // Check if the modal is already added to avoid duplicates
    if (!document.getElementById('ai-modal')) {
        const modalHTML = `
            <div id="ai-modal" style="
                position: fixed;
                top: 10%;
                left: 50%;
                transform: translate(-50%, 0);
                width: 50%;
                background-color: white;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                padding: 20px;
                z-index: 9999;
                border-radius: 8px;
                display: block;
            ">
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                    <button id="btn1">Option 1</button>
                    <button id="btn2">Option 2</button>
                    <button id="btn3">Option 3</button>
                </div>
                <div id="modal-body" style="margin-top: 10px; font-size: 14px;">
                    Processing...
                </div>
                <button id="close-modal" style="
                    margin-top: 10px;
                    background: red;
                    color: white;
                    border: none;
                    padding: 10px;
                    border-radius: 5px;
                    cursor: pointer;
                ">
                    Close
                </button>
            </div>
        `;

        // Inject the modal HTML into the webpage
        const modalDiv = document.createElement('div');
        modalDiv.innerHTML = modalHTML;
        document.body.appendChild(modalDiv);

        // Close button functionality
        document.getElementById('close-modal').addEventListener('click', () => {
            document.getElementById('ai-modal').remove();
        });

        // Add functionality for buttons
        document.getElementById('btn1').addEventListener('click', () => {
            alert('Option 1 clicked');
        });
        document.getElementById('btn2').addEventListener('click', () => {
            alert('Option 2 clicked');
        });
        document.getElementById('btn3').addEventListener('click', () => {
            alert('Option 3 clicked');
        });
    }

    // Simulate AI response (replace this with your AI API call)
    const simulatedResponse = `Summary for: "${selectedText}"`;

    // Update the modal body with the AI response
    const modalBody = document.getElementById('modal-body');
    modalBody.textContent = simulatedResponse;
}

// Export the function so it can be used elsewhere
export { injectAndSummarizeText };

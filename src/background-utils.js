import { createAiSession } from "./resources/nano-utils.js";

class AinfoScoutManager {
    constructor() {
        this.assistantPrompts = {
            ARTICLE_SUMMARY: `Hi, you're an expert in extracting summaries...`
        };
    }

    async generateSummary(selectedText) {
        if (!selectedText) {
            console.error("No text selected.");
            return;
        }

        const options = {
            sharedContext: 'This is a scientific article',
            type: 'key-points',
            format: 'markdown',
            length: 'medium',
          };
        const aiSession = await createAiSession("summary",options);
        if (!aiSession) {
            return "AI isn't enabled on your device. Here's a dummy summary.";
        }

        try {
            const response=await aiSession.summarize(selectedText);
            return response;
        } catch (error) {
            console.log(JSON.stringify(error))
            console.log("Error generating summary:");
            return "Error generating summary.";
        }
    }
}

async function showTextInsideModal(textToShow) {
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
                <div style="
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                ">
                    <h3 style="margin: 0;">Ainfo Scout</h3>
                    <button id="close-modal" style="
                        background: blue;
                        color: white;
                        border: none;
                        padding: 10px;
                        border-radius: 5px;
                        cursor: pointer;
                    ">
                        Close
                    </button>
                </div>

                <div id="modal-body" style="margin-top: 10px; font-size: 14px;">
                    ${textToShow}
                </div>

                <button id="action-api" style="
                    margin-top: 10px;
                    background: green;
                    color: white;
                    border: none;
                    padding: 10px;
                    border-radius: 5px;
                    cursor: pointer;
                ">
                    Translate to Arabic
                </button>
            </div>
        `;
        const modalDiv = document.createElement('div');
        modalDiv.innerHTML = modalHTML;
        document.body.appendChild(modalDiv);

        // Add close functionality
        document.getElementById('close-modal').addEventListener('click', () => {
            document.getElementById('ai-modal').remove();
        });

        // Add translate button functionality
        document.getElementById('action-api').addEventListener('click', async () => {
            const translatedText = "Translate Action Called";
            document.getElementById('modal-body').textContent = `Translated Text: ${translatedText}`;
        });
    } else {
        const modalBody = document.getElementById('modal-body');
        modalBody.textContent = textToShow;
    }
}

async function triggerAnotherApi(textToTranslate) {
    const apiKey = "YOUR_API_KEY"; // Replace with your Google API Key
    const url = `https://translation.googleapis.com/language/translate/v2`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                q: textToTranslate,
                target: "ar",
                format: "text",
                key: apiKey,
            }),
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.statusText}`);
        }

        const result = await response.json();
        console.log("API Response:", result);

        const translatedText = result.data.translations[0].translatedText || "Translation not available.";
        return translatedText;
    } catch (error) {
        console.error("Error calling the API:", error);
        return `Error calling API: ${error.message}`;
    }
}
export { AinfoScoutManager, showTextInsideModal };

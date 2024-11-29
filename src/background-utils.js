import { createAiSession } from "./resources/nano-utils.js";

class AinfoScoutManager {
    constructor() {
        this.assistantPrompts = {
            ARTICLE_SUMMARY: `Hi, you're an expert in extracting summaries...`
        };
    }

    // async createAiSession(sessionType,createOptions) {
    //     console.log("Initializing AI session...");
    //     let sessionTypeFunction;
    //     if(sessionType==="summary"){
    //         sessionTypeFunction=self.ai.summarizer
    //     }
    //     else{
    //         sessionTypeFunction=self.ai.languageMode
    //     }
    //     const isAIReady = 
    //         (await sessionTypeFunction.capabilities()).available === "readily"
    //             ? "AI Enabled"
    //             : "AI Isn't Enabled";
    //     console.log(isAIReady);
    //     if (isAIReady !== "AI Enabled") {
    //         return null;
    //     }
    //     return await sessionTypeFunction.create();
    // }

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
            console.log(error)
            console.error("Error generating summary:");
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
                <div id="modal-body" style="margin-top: 10px; font-size: 14px;">
                    ${textToShow}
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
        const modalDiv = document.createElement('div');
        modalDiv.innerHTML = modalHTML;
        document.body.appendChild(modalDiv);

        document.getElementById('close-modal').addEventListener('click', () => {
            document.getElementById('ai-modal').remove();
        });
    } else {
        const modalBody = document.getElementById('modal-body');
        modalBody.textContent = textToShow;
    }
}

export { AinfoScoutManager, showTextInsideModal };

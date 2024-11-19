async function createAiSession(){
    const isAIReady=(await window.ai.languageModel.capabilities()).available === "readily" ? "AI Enabled" : "AI Isn't Enabled";
    alert(isAIReady)
    const aiSession=await window.ai.languageModel.create()
    return aiSession;
}
async function fetchData() {
    // Get the selected text
    const selection = window.getSelection().toString();

    if (!selection) {
        console.error("No text selected.");
        return;
    }
    try {
        const aiSession=await createAiSession();
        if(!aiSession){
        
            document.getElementById('data').innerHTML = `AI Isn't Enabled`;
        }
        const aiResponse=await aiSession.prompt(`Please give a summary for this article: ${selection}`);
        document.getElementById('data').innerHTML = aiResponse;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

document.addEventListener("mouseup", () => {
    if (window.getSelection().toString()) {
        fetchData();
    }
});

export async function createAiSession(sessionType,createOptions) {
        console.log("Initializing AI session...");
        let sessionTypeFunction;
        if(sessionType==="summary"){
            sessionTypeFunction=self.ai.summarizer.create(createOptions)
        }
        else{
            sessionTypeFunction=self.ai.languageMode.create(createOptions)
        }
        const isAIReady = 
            (await self.ai.languageModel.capabilities()).available === "readily"
                ? "AI Enabled"
                : "AI Isn't Enabled";
        console.log(isAIReady);
        if (isAIReady !== "AI Enabled") {
            return null;
        }
        return await sessionTypeFunction;
    }
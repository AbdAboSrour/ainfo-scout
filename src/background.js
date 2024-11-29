import { AinfoScoutManager, showTextInsideModal } from './background-utils.js';

const summaryGenerator = new AinfoScoutManager();

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "ainfoScout",
        title: "Ainfo Scout",
        contexts: ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    if (info.menuItemId === "ainfoScout") {
        const selectedText = info.selectionText;
        const summary = await summaryGenerator.generateSummary(selectedText);
        await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: showTextInsideModal,
            args: [summary]
        });
    }
});

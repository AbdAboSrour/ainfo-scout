

import { injectAndSummarizeText } from './backgroun-utils.js';

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
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: injectAndSummarizeText,
            args: [selectedText]
        });
    }
});

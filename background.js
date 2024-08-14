chrome.action.onClicked.addListener(async (tab) => {
   function getSelections() {
        selections = getSelection().toString(); return selections;
    }
    chrome.scripting
        .executeScript({
            target: { tabId: tab.id, allFrames: true },
            func: getSelections,
        })
        .then(injectionResults => {
            for (const { frameId, result } of injectionResults) {
                console.log(`Frame ${frameId} result:`, result);
                var thingsURL = ('things:///add?show-quick-entry=true&title=' + encodeURIComponent(tab.title) + '&notes=' + encodeURIComponent(result + " " + tab.url));
                chrome.tabs.update({ url: thingsURL });
            }
        });

});
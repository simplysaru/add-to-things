async function addToThings(tab) {
  try {
    const selectedText = await getSelectedText(tab);
    const notes = [selectedText, tab.url].filter(Boolean).join("\n");

    const todoTitle = encodeURIComponent(tab.title);
    const todoNotes = encodeURIComponent(notes);
    const thingsURL = `things:///add?show-quick-entry=true&title=${todoTitle}&notes=${todoNotes}`;
    chrome.tabs.update({ url: thingsURL });
  } catch (error) {
    console.error("Failed to add to Things:", error);
  }
}

async function getSelectedText(tab) {
  const injectionResults = await chrome.scripting.executeScript({
    target: { tabId: tab.id, allFrames: true },
    func: () => getSelection().toString(),
  });

  for (const frame of injectionResults) {
    if (frame.result && typeof frame.result === "string") {
      return frame.result.trim();
    }
  }
}

chrome.action.onClicked.addListener(addToThings);
chrome.commands.onCommand.addListener(addToThings);

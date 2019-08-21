xPathList = [
// define your xPath here.
// eg for safebooru:
//
// "//img[@id='image']/@src",
];

proceededTabs = new Set();
pruneCounter = 0;

chrome.extension.onMessage.addListener((request, sender, sendResponse) => {
    console.log('porcess message')
    if (proceededTabs.has(sender.tab.id)) {
        console.log('already open')
        return
    }

    proceededTabs.add(sender.tab.id);

    if (pruneCounter > 50) {
        pruneCounter = 0;
        console.log('was ${proceededTabs.size}')
        chrome.tabs.query({}, (tabs) => {
            proceededTabs = new Set(tabs.filter((el) => proceededTabs.has(el)));
        })
        console.log('became ${proceededTabs.size}')
    }
    pruneCounter++;

    sendResponse({xPathList});
});

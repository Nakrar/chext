chrome.extension.sendMessage({}, function (response) {
    handler = () => {
        if (!response.xPathList || !response.xPathList.length) {
            alert("ChExt: please configure xPathList");
        }
        for (let xpath of response.xPathList) {
            let xpathMatch = document.evaluate(
                xpath,
                document,
                null,
                XPathResult.FIRST_ORDERED_NODE_TYPE,
                null
            ).singleNodeValue;
            if (xpathMatch) {
                window.location.href = xpathMatch.value;
                return
            }
        }
//            }
    };

    if (document.readyState == 'loading') {
        document.addEventListener("DOMContentLoaded", handler);
    } else {
        handler()
    }
});

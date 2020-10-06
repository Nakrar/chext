chrome.extension.sendMessage({href: window.location.href}, function (response) {
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
                window.history.pushState({}, "", window.location.href )
                window.location.href = xpathMatch.value;
                return
            }
        }
    };

    if (document.readyState == 'complete') {
        document.onload(handler);
    } else {
        handler(response)
    }

});
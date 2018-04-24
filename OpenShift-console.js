// ==UserScript==
// @name         OpenShift
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  add an additional search field to the OpenShift conole
// @author       bakito
// @match        https://*/console/
// @grant        none
// ==/UserScript==
var myObserver = new MutationObserver(mutationHandler);
var obsConfig = {
    childList: true, attributes: true,
    subtree: true, attributeFilter: ['class']
};

myObserver.observe(document, obsConfig);


function mutationHandler(mutationRecords) {

    mutationRecords.forEach(function (mutation) {
        if (document.getElementById("openshift-custom-search") == null) {
            if (mutation.type === "childList" && typeof mutation.addedNodes === "object" && mutation.addedNodes.length
            ) {
                for (var J = 0, L = mutation.addedNodes.length; J < L; ++J) {
                    addNewSearchField(mutation.addedNodes[J]);
                }
            }
            else if (mutation.type === "attributes") {
                addNewSearchField(mutation.target);
            }
        }
    });
}

function addNewSearchField(node) {
    //-- Only process element nodes
    if (node.nodeType === 1) {
        if (node.id === 'search-projects') {

            var mi = document.createElement("input");
            mi.id = "openshift-custom-search";
            mi.style = "margin-top: 17px;";
            mi.class = node.class;
            mi.type = node.type;
            mi.autofocus = true;
            mi.oninput = function () {
                var search = document.getElementById("search-projects");
                search.value = mi.value;
                var event = new Event('change');
                search.dispatchEvent(event);
            };
            var mDiv = document.createElement("div");
            mDiv.class = "navbar-header";
            mDiv.appendChild(mi);

            var header = document.getElementsByClassName("navbar-header")[0];

            header.parentNode.insertBefore(mDiv, header.nextSibling);

        }
    }
}

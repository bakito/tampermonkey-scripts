// ==UserScript==
// @name         OpenShift Console
// @namespace    https://github.com/bakito
// @version      0.4
// @description  add an additional search field to the OpenShift console
// @run-at       document-end
// @author       bakito
// @match        https://*/console/
// @grant        none
// @icon         https://upload.wikimedia.org/wikipedia/commons/3/3a/OpenShift-LogoType.svg
// @updateURL    https://raw.githubusercontent.com/bakito/tampermonkey-scripts/master/OpenShift-console.user.js
// @downloadURL  https://raw.githubusercontent.com/bakito/tampermonkey-scripts/master/OpenShift-console.user.js
// ==/UserScript==
(function () {
    'use strict';
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

                var newInput = document.createElement("input");
                // copy all attributes
                cloneAttributes(node, newInput);
                newInput.id = "openshift-custom-search";
                newInput.style = "margin-top: 17px;";
                newInput.autofocus = true;
                newInput.oninput = function () {
                    var search = document.getElementById("search-projects");
                    search.value = newInput.value;
                    var event = new Event('change');
                    search.dispatchEvent(event);
                };
                var newSearchDiv = document.createElement("div");
                newSearchDiv.class = "navbar-header";
                newSearchDiv.appendChild(newInput);

                var header = document.getElementsByClassName("navbar-header")[0];

                header.parentNode.insertBefore(newSearchDiv, header.nextSibling);

            }
        }
    }


    function cloneAttributes(sourceNode, element) {
        let attr;
        let attributes = Array.prototype.slice.call(sourceNode.attributes);
        while (attr = attributes.pop()) {
            element.setAttribute(attr.nodeName, attr.nodeValue);
        }
    }
})();
// ==UserScript==
// @name         OpenShift deadman switch
// @namespace    https://github.com/bakito
// @version      0.1
// @description  periodically call OpenShift console to prevent logout
// @run-at       document-end
// @author       bakito
// @match        https://*/console/*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @grant        none
// @icon         https://upload.wikimedia.org/wikipedia/commons/3/3a/OpenShift-LogoType.svg
// @updateURL    https://raw.githubusercontent.com/bakito/tampermonkey-scripts/master/OpenShift-deadman-switch.js
// @downloadURL  https://raw.githubusercontent.com/bakito/tampermonkey-scripts/master/OpenShift-deadman-switch.js
// ==/UserScript==
(function() {
  "use strict";
  setInterval(function() {
    var $ = window.jQuery;
    var userIP;
    $.ajax({
      url: location.protocol + "://" + location.host + "/console/command-line",
      async: false,
      success: function(data) {
        console.log("ping");
      }
    });
  }, 120 * 1000); // repeat every 120s
})();

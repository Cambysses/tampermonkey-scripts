// ==UserScript==
// @name         Mirror YouTube Layout
// @namespace    http://tampermonkey.net/
// @version      1.0
// @require http://code.jquery.com/jquery-3.4.1.min.js
// @author       Cambysses
// @match        https://*.youtube.com/*
// @icon         https://www.google.com/s2/favicons?domain=youtube.com
// @runat document-end
// @grant        none
// ==/UserScript==

// Moves the recommended video pane from the right to the left of the page layout.

(function() {
    $('#secondary').each(function() {
        $(this).insertBefore( $(this).prev('#primary') );
    });
})();

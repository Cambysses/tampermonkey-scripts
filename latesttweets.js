// ==UserScript==
// @name     Latest Tweets
// @version  1.6
// @author Cambysses
// @grant    none
// @include http*://twitter.com*
// @run-at document-end
// ==/UserScript==

// Script sees if tweets are set to "home", and if so switches to "latest".

setTimeout(function()
{
    // Checks if tweets are set to "Home".
    if (!document.querySelector('span[text="Latest Tweets"]'))
    {
        // Click "See Latest Tweets Instead" button.
        document.querySelector('div[aria-label="Top Tweets on"]').click();
        document.querySelector('div[role="menuitem"]').click();
    }
}, 1000);

// ==UserScript==
// @name     Latest Tweets
// @version  1.5
// @author Cambysses
// @grant    none
// @include http*://twitter.com*
// @run-at document-end
// ==/UserScript==

// Script sees if tweets are set to "home", and if so switches to "latest".

setTimeout(function()
{
    // Checks if tweets are set to "Home".
    const menuButton = document.querySelector('div[aria-label="Top Tweets on"]')
    if (menuButton)
    {
        // Clicks on menu button.
        menuButton.click();

        // Click "See Latest Tweets Instead" button. Yes I know this is hideous.
        document.evaluate("//span[text()='See latest Tweets instead']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.parentElement.parentElement.parentElement.click();
    }
}, 1000);

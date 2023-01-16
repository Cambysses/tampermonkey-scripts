// ==UserScript==
// @name     Latest Tweets
// @description  Forces chronological view on Twitter
// @version  1.7
// @author Cambysses
// @grant    none
// @match http*://twitter.com*
// @run-at document-end
// ==/UserScript==

// Script sees if tweets are set to "home", and if so switches to "latest".

setTimeout(function()
{
    // Old Twitter layout
    let latestTweetsButton = document.querySelector('span[text="Latest Tweets"]');

    // New Twitter Layout
    let followingButton = Array.from(document.querySelectorAll('span')).find(e => e.textContent === 'Following');

    // Checks if tweets are set to "Home".
    if (latestTweetsButton && !followingButton)
    {
        // Click "See Latest Tweets Instead" button.
        document.querySelector('div[aria-label="Top Tweets on"]').click();
        document.querySelector('div[role="menuitem"]').click();
    }
    else if (getComputedStyle(followingButton).fontWeight < 700)
    {
        followingButton.click();
    }
}, 1000);

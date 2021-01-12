// ==UserScript==
// @name     Latest Tweets
// @version  1.4
// @grant    none
// @include http*://twitter.com*
// @run-at document-end
// ==/UserScript==

// Script sees if tweets are set to "home", and if so switches to "latest".

function sleep(milliseconds)
{
	return new Promise(resolve => setTimeout(resolve, milliseconds));
}

function click(element)
{
	const event = document.createEvent("HTMLEvents");
	event.initEvent("click", true, true);
	element.dispatchEvent(event);
}

(async () =>
{
    // Waits a second for page to load, hacky but couldn't get this to work otherwise.
    await sleep(1000);

    // Checks if tweets are set to "Home".
    const menuButton = document.querySelector('div[aria-label="Top Tweets on"]')
    if (menuButton)
    {
        // Clicks on menu button.
        click(menuButton);

        // Click "Latest" button. Yes I know this is hideous.
        click(document.evaluate("//span[text()='See latest Tweets instead']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.parentElement.parentElement.parentElement);
    }
})();

// ==UserScript==
// @name     Latest Tweets
// @version  1.2
// @grant    none
// @include http*://twitter.com*
// @run-at document-end
// ==/UserScript==

// Script sees if tweets are set to "home", and if so switches to "latest".

function sleep(ms)
{
	return new Promise(resolve => setTimeout(resolve, ms));
}

function click(element)
{
	let event = document.createEvent("HTMLEvents");
	event.initEvent("click", true, true);
	element.dispatchEvent(event);	 
}

(async () => 
{
	for(i = 0; i < 5; i++)
	{
		await sleep(1000);

		// Checks if tweets are set to "Home".
		let menuButton = document.querySelector('div[aria-label="Top Tweets on"]')
		if (menuButton != null)
		{
			// Clicks on option icon.
			click(menuButton);
			await sleep(500);

			// Click "Latest".
			let latestButton = document.querySelector('div[role="menuitem"]')
			click(latestButton);
			break
		}
		console.log(i);
	}
})();

// ==UserScript==
// @name     Latest Tweets
// @version  1.3
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
	for(i = 0; i < 5; i++)
	{
		// Waits a second for page to load, couldn't get this to work otherwise.
		await sleep(1000);

		// Checks if tweets are set to "Home".
		const menuButton = document.querySelector('div[aria-label="Top Tweets on"]')
		if (menuButton != null)
		{
			// Clicks on menu button.
			click(menuButton);
			await sleep(500);

			// Click "Latest" button.
			const latestButton = document.querySelector('div[class="css-18t94o4 css-1dbjc4n r-1loqt21 r-18u37iz r-1j3t67a r-9qu9m4 r-o7ynqc r-1j63xyz r-13qz1uu"]')
			click(latestButton);
			break
		}
	}
})();

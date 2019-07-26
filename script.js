// ==UserScript==
// @name     Latest Tweets
// @version  1.1
// @grant    none
// @include http*://twitter.com*
// @run-at document-end
// ==/UserScript==

// Script sees if tweets are set to "home", and if so switches to "latest".

function getElementByXpath(path)
{
	return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function sleep(ms)
{
	return new Promise(resolve => setTimeout(resolve, ms));
}

function click(element)
{
  var button = getElementByXpath(element);
  var event = document.createEvent("HTMLEvents");
  event.initEvent("click", true, true);
  button.dispatchEvent(event);	 
}

(async () => 
 {
  for(i = 0; i < 5; i++)
  {
    await sleep(1000);

    // Checks if tweets are set to "Home".
    var home = (getElementByXpath("/html/body/div/div/div/div/main/div/div[2]/div/div[1]/div/div/div[1]/div[1]/div/div/div/div/div[1]/div/h2/span").innerText);
    if (home == "Home")
    {
      // Clicks on option icon.
      click("/html/body/div/div/div/div/main/div/div[2]/div/div[1]/div/div/div[1]/div[1]/div/div/div/div/div[2]/div/div");
      await sleep(500);

      // Click "Latest".
      click("/html/body/div/div/div/div[1]/div/div/div[2]/div[3]/div/div/div/div[2]");
      break
    }
    console.log(i);
  }
})();

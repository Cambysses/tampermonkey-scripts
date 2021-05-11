// ==UserScript==
// @name         coindesk-value
// @namespace    http://tampermonkey.net/
// @version      1
// @author       Cambysses
// @match        https://www.coindesk.com/price/dogecoin
// @icon         https://www.google.com/s2/favicons?domain=coindesk.com
// @require http://code.jquery.com/jquery-3.4.1.min.js
// @grant        none
// ==/UserScript==

function calculateValue(coins)
{
    return (parseFloat($(".price-large")[0].innerText.split('$')[1]) * coins).toFixed(2);
}

// Set your owned amount of coins here.
let coins = 0

// Click CAD currency.
$(".dropdown-header-title").click();
$('.dropdown-list-item:contains("CAD")').click();

// Insert empty span where coin value will reside.
$(".price-large").append(`<br><span class='coinvalue' style='color: green'></span>`);

// Check every second to see if ticker has updated.
setInterval(function()
{
    $(".coinvalue").html("$" + calculateValue(coins));
}, 1000);

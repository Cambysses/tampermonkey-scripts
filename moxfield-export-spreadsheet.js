// ==UserScript==
// @name         Moxfield - Export decklist to Spreadsheet
// @namespace    http://tampermonkey.net/
// @version      2025-02-02
// @description  Adds an "Export to Spreadsheet" button to Moxfield decklist page, does just that
// @author       Cambysses
// @match        *://moxfield.com/decks/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=moxfield.com
// @grant        none
// @run-at document-idle
// ==/UserScript==
(function () {
    'use strict';

    let done = false;

    function checkForElement(observer) {
        if (done) {
            return;
        }
        let targetElement = document.querySelector(".LFQILNJUd0WkLwZH_6IA");
        if (targetElement) {
            done = true;
            insertExportOption();
            observer.disconnect();
        }
    }

    function convertObjectArrayToCsv(data) {
        // Extract the headers (keys from the first object)
        let headers = Object.keys(data[0]);
        // Map each object to a CSV row
        let rows = data.map(obj =>
            headers.map(header => JSON.stringify(obj[header] ?? "")).join(",")
        );
        // Combine headers and rows into a single CSV string
        return [headers.join(","), ...rows].join("\n");
    }

    function promptDownload(data, filename) {
        let csvString = convertObjectArrayToCsv(data);

        // Create a Blob from the CSV string
        let blob = new Blob([csvString], { type: "text/csv" });

        // Create a temporary <a> element for downloading the file
        let a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = filename;

        // Append the <a> to the document, trigger the download, and remove the element
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    function showErrorMessage() {
        alert("Could not generate file. Make sure you have \"Mana Cost\", \"Price\", and \"Set Symbol\" enabled under \"View Options\".");
    }

    function getCards() {
        let cards = [];

        try {
            document.querySelectorAll(".XIi4jFys2lGhYwseGpBo").forEach((cardElement) => {
                // Get count
                let count = cardElement.querySelector(".dcD5V3uk1cjCKIMHR5hC input").value;

                // Get name
                let name = "";
                cardElement.querySelectorAll(".table-deck-row-link span").forEach((nameElement) => {
                    if (nameElement.children.length === 0) {
                        name += nameElement.innerText;
                    }
                });

                // Get mana cost
                let manaCost = "";
                cardElement.querySelectorAll(".mana").forEach((manaElement) => {
                    manaCost += manaElement.classList[1].split("-")[1].toUpperCase();
                });

                // Get price
                let price = cardElement.querySelector(".text-end.text-monospace").innerText;

                // Get set
                let set = cardElement.querySelector(".zNzCIkFbLmQ5PAHzbwZa").getAttribute("title");

                // Get rarity
                let rarity = cardElement.querySelector(".zNzCIkFbLmQ5PAHzbwZa").classList[1].split("-")[1];

                // Get type
                let cardType = makeCardTypeSingular(cardElement.parentElement.querySelector(".QplEGzdpUY3yofYwhhX0 a .d-inline-block.me-1").innerText);

                // Create scryfall search link
                let scryFallLink = "https://scryfall.com/search?q=" + name.replaceAll(" ", "+");

                cards.push({
                    count,
                    name,
                    manaCost,
                    price,
                    set,
                    rarity,
                    cardType,
                    scryFallLink
                });
            });
            return cards;
        }
        catch (e) {
            showErrorMessage();
            return;
        }
    }

    function getDeckTitle() {
        return document.querySelector(".deckheader-name").innerText;
    }

    function insertExportOption() {
        let menu = document.querySelector(".LFQILNJUd0WkLwZH_6IA .col-sm-auto.d-flex");
        let menuItem = document.createElement("span");
        menuItem.classList.add("me-5");
        menu.insertBefore(menuItem, menu.lastElementChild);

        let menuItemLink = document.createElement("a");
        menuItemLink.classList.add("xQ0_bw2aqoYGKBWqhsjz");
        menuItemLink.classList.add("text-nowrap");
        menuItemLink.classList.add("cursor-pointer");
        menuItemLink.classList.add("no-outline");
        menuItem.appendChild(menuItemLink);

        menuItemLink.onclick = () => {
            promptDownload(getCards(), `${getDeckTitle()}.xlsx`);
        };

        let icon = document.createElement("i");
        icon.classList.add("fa-light");
        icon.classList.add("fa-file-export");
        icon.classList.add("me-sm-2");
        menuItemLink.appendChild(icon);

        let menuItemLinkText = document.createElement("span");
        menuItemLinkText.classList.add("d-sm-inline");
        menuItemLinkText.innerText = "Export to Spreadsheet";

        menuItemLink.appendChild(menuItemLinkText);
    }

    function makeCardTypeSingular(cardType) {
        switch (cardType) {
            case "Creatures":
                return "Creature";
            case "Artifacts":
                return "Artifact";
            case "Enchantments":
                return "Enchantment";
            case "Instants":
                return "Instant";
            case "Sorceries":
                return "Sorcery";
            case "Planeswalkers":
                return "Planeswalker";
            case "Lands":
                return "Land";
            case "Battles":
                return "Battle";
            case "Commanders":
                return "Commander";
            default:
                return cardType;
        }
    }

    function main() {
        const observer = new MutationObserver((mutationsList) => {
            for (let mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    checkForElement(observer);
                }
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }

    main();

})();

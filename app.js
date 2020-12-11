"use strict";

const textarea = document.getElementById("textarea");
const output = document.getElementById("output");
const errorEl = document.getElementById("error");
const translateBtn = document.getElementById("btn");

const BASE_URL = "https://api.funtranslations.com/translate/minion.json";

function getTranslationURL(text) {
    return `${BASE_URL}?text=${text}`;
}

async function fetchData(url) {
    try {
        const response = await fetch(url);

        if (!response.ok && response.status === 429)
            throw new Error("API limit exceeded! Try again after 1 hour.");
        else if (!response.ok)
            throw new Error("Something went wrong! Please try again.");

        const data = await response.json();
        return data.contents.translated;
    } catch (error) {
        console.log(error);
        errorEl.style.visibility = "visible";
        errorEl.innerText = error;
        setTimeout(() => {
            errorEl.innerText = "";
            errorEl.style.visibility = "hidden";
        }, 5000);
        throw error;
    }
}

function handleClick(e) {
    const inputText = textarea.value;
    const url = getTranslationURL(inputText);
    output.innerText = "Loading...";

    fetchData(url)
        .then((data) => {
            output.innerText = data;
        })
        .catch(() => {
            output.innerText = "";
        });
}

translateBtn.addEventListener("click", handleClick);

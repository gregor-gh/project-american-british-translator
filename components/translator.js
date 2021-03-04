const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {

  translate(locale, text) {

    // use either americanonly.js or britishonly.js depending on locale
    let wordDictionary;
    if (locale === "american-to-british") {
      wordDictionary = americanOnly;
    } else {
      wordDictionary = britishOnly;
    }

    // want to create an array of all words to later combine and sort
    const wordArray = Object.entries(wordDictionary);

    // spelling needs to be swapped around if the locale is british to english, as the dictionary provided is american to british
    let spellingArray = Object.entries(americanToBritishSpelling);
    if (locale === "british-to-american") {
      spellingArray = spellingArray.map(el => {
        return [el[1], el[0]] // swapp around the positions of the two array elements to make british to american
      })
    }

    // same for titles
    let titleArray = Object.entries(americanToBritishTitles);
    if (locale === "british-to-american") {
      titleArray = titleArray.map(el => {
        return [el[1], el[0]] // swap around the positions of the two array elements to make british to american
      })
    }

    //combine the arrays
    let fullArray = [...titleArray, ...spellingArray, ...wordArray]

    // now sort the array so the bigger words are looked for first
    fullArray = fullArray.sort((a, b) => {
      return b[0].length - a[0].length // first element of subarray
    });

    // will store replace any changed words in these two variables for return
    let rawText = text.toLowerCase();
    let htmlText = text.toLowerCase();

    // wrap the htmlText replacements with span so it highlights in green
    const htmlLeft = `<span class="highlight">`
    const htmlRight = "</span>"
    
    // now for each entry in that array look if it's in the submitted text
    fullArray.forEach(el => {
      rawText = rawText.replace(el[0], el[1]); // if it is then replace it with the translation
      htmlText = htmlText.replace(el[0], htmlLeft + el[1] + htmlRight); // same but with span
    })

    // if the rawtest is the same as submitted text then return false as no changes were made
    if (rawText.toLowerCase() === text.toLowerCase()) {
      return false;
    }

    // Re-captilise first letter
    rawText = rawText.substring(0, 1).toUpperCase() + rawText.substring(1);
    htmlText = htmlText.substring(0, 1).toUpperCase() + htmlText.substring(1);

    return {
      rawTranslation: rawText,
      htmlTranslation: htmlText,
    };
  }
}

module.exports = Translator;
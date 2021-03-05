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

    // wrap the htmlText replacements with span so it highlights in green
    const htmlLeft = `<span class="highlight">`;
    const htmlRight = "</span>";

    // working text to be used in recursion
    let htmlText = text;

     // recursively loop through the dictionary until no more matches are found
    const translateLoop = (done) => {

      // if no more words are found then return the text
      if (done) return htmlText;

      //  use this to store a lowercase verison of the text for searching
      let lowerText;

      // use this to store index of found word
      let wordIndex;

      // loop through each word in dictionary
      fullArray.forEach(el => {
        
        lowerText = htmlText.toLowerCase(); // set lowertext to match the changeText to lowercase for this loop

        wordIndex = lowerText.lastIndexOf(el[0].toLowerCase()); // store the index of the searched word, will break out of loop if -1

        // if the word is found in the text
        if (wordIndex >= 0) {

          // now check for spaces or characters either side of the text (to avoid instances like "take" being taken as "ta" translkated to "thank you")
          let left = lowerText[wordIndex - 1]; // letter to the left of the found word
          let right = lowerText[wordIndex + el[0].length]; // letter to the right of the found word

          // if at the start/end of text then these will be undefined, set to empty string instead
          if (!left) left = "";
          if (!right) right = "";

          const regex = /[A-Z]|<|>/i // regex to serach for case insensitve letters and < > (added later for spans)

          // if neither the left or th eright of the word is a letter it can be translated
          if (!left.match(regex) && !right.match(regex)) {

            // create a new version of the text with the changed word and the html span
            htmlText = htmlText.substring(0, wordIndex) + htmlLeft + el[1] + htmlRight + htmlText.substring(wordIndex + el[0].length, htmlText.length);

            // run the loop again to seach for additional words
            translateLoop(false);
          }
        }    
      })

      // break loop?
      translateLoop(true);
    }

    // run through recursive loop
    translateLoop(false);

    // update html with time changes
    htmlText = this.translateTimes(htmlText, locale, htmlLeft, htmlRight);

    let rawText = htmlText;

    // strip out html for fCC tests
    rawText = this.cleanHtml(htmlLeft,rawText);
    rawText = this.cleanHtml(htmlRight, rawText);
    
    // if raw text matches the original text then no changes were made
    if (rawText === text) {
      return false;
    }
      
    // return modified text and html text
    return {
      rawTranslation: rawText,
      htmlTranslation: htmlText,
    };
  }

  // helper function to loop through text and remove html tags
  cleanHtml(html, text) {
    while (true) {
      let i = text.indexOf(html);
      if (i === -1) break;
      text = text.substring(0, i) + text.substring(i + html.length);
    }
    return text;
  }

  // function to handle times 
  translateTimes(htmlText, locale, htmlLeft, htmlRight) {
    // regex to search for times
    let timeRegex;

    let charToChange;
    let charToChangeTo;

    // array to store changes
    let timeArray = [];

    // regex will differ depending on if we're going american to british or vice versa
    if (locale === "american-to-british") {
      timeRegex = /[0-9]+:[0-9]+/g;
      charToChange = ":";
      charToChangeTo = ".";
    } else {
      timeRegex = /[0-9]+\.[0-9]+/g;
      charToChange = ".";
      charToChangeTo = ":";
    }

    // set a regex itereator
    const matches = htmlText.matchAll(timeRegex);

    // loop through matches
    for (const match of matches) {
      // store start and end indexes of match
      const start = match.index;
      const end = match.index + match[0].length;

      // get match characters (to account for one and two digit times)
      let timeToChange = htmlText.substring(start, end); // get time using match index and length
      timeToChange = timeToChange.replace(charToChange, charToChangeTo); // replace time character
      timeToChange = htmlLeft + timeToChange + htmlRight; // add html

      // store the change in an array to update back-to-front later
      timeArray.push({
        timeToChange,
        start,
        end,
      })
    }

    // now loop through the timechange array backwards (so as to not mess up indexes) and modify htmlText
    for (let i = timeArray.length; i > 0; i--) {
      const { start, end, timeToChange } = timeArray[i - 1];
      htmlText = htmlText.substring(0, start) + timeToChange + htmlText.substring(end);
    }

    // return text back to main function
    return htmlText;
  }

}

module.exports = Translator;
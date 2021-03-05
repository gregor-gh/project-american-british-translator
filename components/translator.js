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

    // will temporarily store text as it is worked through, removing parts that have already been worked on
    let workText = text;

    //  use this to store a lowercase verison of the text for searching
    let lowerText;

    let changeArray = []; // used later for storing changes to build htmlText

    // now for each entry in that array look if it's in the submitted text
    fullArray.forEach(el => {

      let n = 0; // will use this to search for the same word twice
      //let limit; // use this to stop the same word being translated endlessly

      while (n != -1) {

        lowerText = workText.toLowerCase() // set lowertext to match the changeText to lowercase for this loop

        n = lowerText.indexOf(el[0].toLowerCase()) // store the index of the searched word, will break out of loop if -1
        if (n === -1) break;

        // set the limit to be equal to the index found so that this word doesn't get picked up again if the first few letters are the same
        //if (n <= limit) break;
        //limit = n;
        if (el[0] === "bicky") {
          console.log("here");
          let a = 1;
        }

        if (el[0] === "chippy") {
          console.log("here");
          let b = 1;
        }

        // now check for spaces or characters either side of the text (to avoid instances like "take" being taken as "ta" translkated to "thank you")
        let left = lowerText[n - 1]; // letter to the left of the found word
        let right = lowerText[n + el[0].length]; // letter to the right of the found word

        // if at the start/end of text then these will be undefined, set to empty string instead
        if (!left) left = "";
        if (!right) right = "";

        const regex = /[A-Z]/i // regex to serach for case insensitve letters

        // if neither the left or th eright of the word is a letter it can be translated
        if (!left.match(regex) && !right.match(regex)) {
          // store an array of the text so that the full text can be reconstructed later
          changeArray.push({
            before: workText.substring(0, n),
            translation: el[1],
            after: workText.substring(n + el[0].length, workText.length)
          });

          // remove the text up to the point of translation
          workText = workText.substring(n + el[0].length, workText.length);

        } else {
          break; // otherwise break out of loop for this particular word (this might need fixing)
        }
      }
    })

    // vars to build the text and html to return to api
    let rawText = "";
    let htmlText = "";

    // wrap the htmlText replacements with span so it highlights in green
    const htmlLeft = `<span class="highlight">`;
    const htmlRight = "</span>";

    // need to add a case for times
    changeArray.forEach((el, i) => {
      if (i !== changeArray.length - 1) {
        rawText += el.before + el.translation;
        htmlText += el.before + htmlLeft + el.translation + htmlRight;
      } else {
        rawText += el.before + el.translation + el.after;
        htmlText += el.before + htmlLeft + el.translation + htmlRight + el.after;
      }
    })

    // TODO implement time
    // FIXME I had a bicky then went to the chippy. if a longer word comes after a shorter word it will be ignored


    // if the rawtest is the same as submitted text then return false as no changes were made
    if (rawText.toLowerCase() === "") {
      return false;
    }


    return {
      rawTranslation: rawText,
      htmlTranslation: htmlText,
    };
  }
}

module.exports = Translator;
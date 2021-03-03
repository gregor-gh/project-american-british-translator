const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {

  translate(locale, text) {

    let rawTest = "Test";
    let htmlTest = `<span class="highlight">Test</span>`;

    return {
      rawTranslation: rawTest,
      htmlTranslation: htmlTest,
    };
  }

}

module.exports = Translator;
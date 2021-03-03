'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      // get vars from request body
      const text = req.body.text;
      const locale = req.body.locale;

      // if text is blank return error
      if (text === "") {
        return res.json({ error: "No text to translate" });
      }

      // if locale isn't recognised return error
      if (locale !== "american-to-british" || locale !== "british-to-american") {
        return res.json({ error: "Invalid value for locale field" });
      }

      // if no text or locale return error
      if (!text || !locale) {
        return res.json({ error: 'Required field(s) missing' });
      }

      // get object with html translation (including spans) and raw text translation (for unit tests that fCC request)
      const translation = translator.translate(locale, text);

      // if there is a transalation i.e. if the text was changed from one locale to another
      if (translation) {
        return res.json({ text, translation: translation.htmlTranslation }); // return the original text plus the html transalation (including spans)
      } else {
        return res.json({ text, translation: "Everything looks good to me!" }); // otherwise return original text plus a "all good" message
      }
      
    });
};

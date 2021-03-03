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

      const translation = translator.translate(locale, text);

      if (translation) {
        return res.json(translation)
      } else {
        return res.json({ translation: "Everything looks good to me!" });
      }
      
    });
};

const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
const translator = new Translator();

suite('Unit Tests', () => {

    test("Translate Mangoes are my favorite fruit. to British English", done => {
      let input = "Mangoes are my favorite fruit.";
      let answer = "Mangoes are my favourite fruit.";
      let locale = "american-to-british";

      let translation = translator.translate(locale, input);
      assert.equal(translation.rawTranslation, answer, "Translation should be correct");

      done();
    });

    test("Translate I ate yogurt for breakfast. to British English", done => {
      let input = "I ate yogurt for breakfast.";
      let answer = "I ate yoghurt for breakfast.";
      let locale = "american-to-british";

      let translation = translator.translate(locale, input);
      assert.equal(translation.rawTranslation, answer, "Translation should be correct");

      done();
    });

    test("Translate We had a party at my friend's condo. to British English", done => {
      let input ="We had a party at my friend's condo."
      let answer = "We had a party at my friend's flat.";
      let locale = "american-to-british";

      let translation = translator.translate(locale, input);
      assert.equal(translation.rawTranslation, answer, "Translation should be correct");

      done();
    });

    test("Translate Can you toss this in the trashcan for me? to British English", done => {
      let input = "Can you toss this in the trashcan for me?";
      let answer = "Can you toss this in the bin for me?";
      let locale = "american-to-british";

      let translation = translator.translate(locale, input);
      assert.equal(translation.rawTranslation, answer, "Translation should be correct");

      done();
    });

    test("Translate The parking lot was full. to British English", done => {
      let input = "The parking lot was full.";
      let answer = "The car park was full.";
      let locale = "american-to-british";

      let translation = translator.translate(locale, input);
      assert.equal(translation.rawTranslation, answer, "Translation should be correct");

      done();
    });

    test("Translate Like a high tech Rube Goldberg machine. to British English", done => {
      let input = "Like a high tech Rube Goldberg machine.";
      let answer = "Like a high tech Heath Robinson device.";
      let locale = "american-to-british";

      let translation = translator.translate(locale, input);
      assert.equal(translation.rawTranslation, answer, "Translation should be correct");

      done();
    });

    test("Translate To play hooky means to skip class or work. to British English", done => {
      let input = "To play hooky means to skip class or work.";
      let answer = "To bunk off means to skip class or work.";
      let locale = "american-to-british";

      let translation = translator.translate(locale, input);
      assert.equal(translation.rawTranslation, answer, "Translation should be correct");

      done();
    });

    test("Translate No Mr. Bond, I expect you to die. to British English", done => {
      let input = "No Mr. Bond, I expect you to die.";
      let answer = "No Mr Bond, I expect you to die.";
      let locale = "american-to-british";

      let translation = translator.translate(locale, input);
      assert.equal(translation.rawTranslation, answer, "Translation should be correct");

      done();
    });

    test("Translate Dr. Grosh will see you now. to British English", done => {
      let input = "Dr. Grosh will see you now.";
      let answer = "Dr Grosh will see you now.";
      let locale = "american-to-british";

      let translation = translator.translate(locale, input);
      assert.equal(translation.rawTranslation, answer, "Translation should be correct");

      done();
    });
        
    test("Translate Lunch is at 12:15 today. to British English", done => {
      let input = "Lunch is at 12:15 today.";
      let answer = "Lunch is at 12.15 today.";
      let locale = "american-to-british";

      let translation = translator.translate(locale, input);
      assert.equal(translation.rawTranslation, answer, "Translation should be correct");

      done();
    });

    test("Translate We watched the footie match for a while.", done => {
      let input = "We watched the footie match for a while.";
      let answer = "We watched the soccer match for a while.";
      let locale = "british-to-american";

      let translation = translator.translate(locale, input);
      assert.equal(translation.rawTranslation, answer, "Translation should be correct");

      done();
    });

    test("Translate Paracetamol takes up to an hour to work.", done => {
      let input = "Paracetamol takes up to an hour to work.";
      let answer = "Tylenol takes up to an hour to work.";
      let locale = "british-to-american";

      let translation = translator.translate(locale, input);
      assert.equal(translation.rawTranslation, answer, "Translation should be correct");

      done();
    });

    test("Translate First, caramelise the onions.", done => {
      let input = "First, caramelise the onions.";
      let answer = "First, caramelize the onions.";
      let locale = "british-to-american";

      let translation = translator.translate(locale, input);
      assert.equal(translation.rawTranslation, answer, "Translation should be correct");

      done();
    });

    test("Translate I spent the bank holiday at the funfair.", done => {
      let input = "I spent the bank holiday at the funfair.";
      let answer = "I spent the public holiday at the carnival.";
      let locale = "british-to-american";

      let translation = translator.translate(locale, input);
      assert.equal(translation.rawTranslation, answer, "Translation should be correct");

      done();
    });

    test("Translate I had a bicky then went to the chippy.", done => {
      let input = "I had a bicky then went to the chippy.";
      let answer = "I had a cookie then went to the fish-and-chip shop.";
      let locale = "british-to-american";

      let translation = translator.translate(locale, input);
      assert.equal(translation.rawTranslation, answer, "Translation should be correct");

      done();
    });

    test("Translate I've just got bits and bobs in my bum bag.", done => {
      let input = "I've just got bits and bobs in my bum bag.";
      let answer = "I've just got odds and ends in my fanny pack.";
      let locale = "british-to-american";

      let translation = translator.translate(locale, input);
      assert.equal(translation.rawTranslation, answer, "Translation should be correct");

      done();
    });

    test("Translate The car boot sale at Boxted Airfield was called off.", done => {
      let input = "The car boot sale at Boxted Airfield was called off.";
      let answer = "The swap meet at Boxted Airfield was called off.";
      let locale = "british-to-american";

      let translation = translator.translate(locale, input);
      assert.equal(translation.rawTranslation, answer, "Translation should be correct");

      done();
    });

    test("Translate Have you met Mrs Kalyani?", done => {
      let input = "Have you met Mrs Kalyani?";
      let answer = "Have you met Mrs. Kalyani?";
      let locale = "british-to-american";

      let translation = translator.translate(locale, input);
      assert.equal(translation.rawTranslation, answer, "Translation should be correct");

      done();
    });

    test("Prof Joyner of King's College, London.", done => {
      let input = "Prof Joyner of King's College, London.";
      let answer = "Prof. Joyner of King's College, London.";
      let locale = "british-to-american";

      let translation = translator.translate(locale, input);
      assert.equal(translation.rawTranslation, answer, "Translation should be correct");

      done();
    });

    test("Tea time is usually around 4 or 4.30.", done => {
      let input = "Tea time is usually around 4 or 4.30.";
      let answer = "Tea time is usually around 4 or 4:30.";
      let locale = "british-to-american";

      let translation = translator.translate(locale, input);
      assert.equal(translation.rawTranslation, answer, "Translation should be correct");

      done();
    });

    test("Highlight translation in Mangoes are my favorite fruit.", done => {
      let input = "Mangoes are my favorite fruit.";
      let answer = `Mangoes are my <span class="highlight">favourite</span> fruit.`;
      let locale = "american-to-british";

      let translation = translator.translate(locale, input);
      assert.equal(translation.htmlTranslation, answer, "Translation should be correct");

      done();
    });

    test("Highlight translation in I ate yogurt for breakfast.", done => {
      let input = "I ate yogurt for breakfast.";
      let answer = `I ate <span class="highlight">yoghurt</span> for breakfast.`;
      let locale = "american-to-british";

      let translation = translator.translate(locale, input);
      assert.equal(translation.htmlTranslation, answer, "Translation should be correct");

      done();
    });

    test("Highlight translation in We watched the footie match for a while.", done => {
      let input = "We watched the footie match for a while.";
      let answer = `We watched the <span class="highlight">soccer</span> match for a while.`;
      let locale = "british-to-american";

      let translation = translator.translate(locale, input);
      assert.equal(translation.htmlTranslation, answer, "Translation should be correct");

      done();
    });

    test("Highlight translation in Paracetamol takes up to an hour to work.", done => {
      let input = "Paracetamol takes up to an hour to work.";
      let answer = `<span class="highlight">Tylenol</span> takes up to an hour to work.`;
      let locale = "british-to-american";

      let translation = translator.translate(locale, input);
      assert.equal(translation.htmlTranslation, answer, "Translation should be correct");

      done();
    });
});

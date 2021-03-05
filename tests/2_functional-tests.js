const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {

  test("Translation with text and locale fields: POST request to /api/translate", done => {
    chai.request(server)
      .post("/api/translate")
      .send({ text: "Soccer", locale: "american-to-british" })
      .end((err, res) => {
        assert.equal(res.status, 200, "Should respond");
        assert.hasAllKeys(res.body, ["text", "translation"], "Should respond with text and translation");
        assert.equal(res.body.text, "Soccer", "Initial text should be returned");
        assert.equal(res.body.translation, `<span class="highlight">football</span>`, "Translation should be returned, highlighted");

        done();
      });
  });

  test("Translation with text and invalid locale field: POST request to /api/translate", done => {
    chai.request(server)
      .post("/api/translate")
      .send({ text: "Soccer", locale: "british-to-australian" })
      .end((err, res) => {
        assert.equal(res.status, 200, "Should respond");
        assert.equal(res.body.error, "Invalid value for locale field", "Wrong locale should throw error");

        done();
      });
  });

  test("Translation with missing text field: POST request to /api/translate", done => {
    chai.request(server)
      .post("/api/translate")
      .send({ locale: "british-to-american" })
      .end((err, res) => {
        assert.equal(res.status, 200, "Should respond");
        assert.equal(res.body.error, "Required field(s) missing", "No text should throw error");

        done();
      });
  });

  test("Translation with missing locale field: POST request to /api/translate", done => {
    chai.request(server)
      .post("/api/translate")
      .send({ text: "Soccer" })
      .end((err, res) => {
        assert.equal(res.status, 200, "Should respond");
        assert.equal(res.body.error, "Required field(s) missing", "No locale should throw error");

        done();
      });
  });

  test("Translation with empty text: POST request to /api/translate", done => {
    chai.request(server)
      .post("/api/translate")
      .send({ text: "", locale: "british-to-american" })
      .end((err, res) => {
        assert.equal(res.status, 200, "Should respond");
        assert.equal(res.body.error, "No text to translate", "Empty text should throw error");

        done();
      });
  });

  test("Translation with text that needs no translation: POST request to /api/translate", done => {
    chai.request(server)
      .post("/api/translate")
      .send({ text: "Test", locale: "british-to-american" })
      .end((err, res) => {
        assert.equal(res.status, 200, "Should respond");
        assert.hasAllKeys(res.body, ["text", "translation"], "Should respond with text and translation");
        assert.equal(res.body.text, "Test", "Initial text should be returned");
        assert.equal(res.body.translation, "Everything looks good to me!", "Everything good should be returned ");

        done();
      });
  });
});

const axios = require("axios").default;
const https = require("https");
const { JSDOM } = require("jsdom");
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});
async function getPrices() {
  const url = "https://www.bcv.org.ve/";
  try {
    const req = await axios.get(url, {
      httpsAgent,
      responseType: "text",
      headers: {
        "Accept-Encoding": "gzip,deflate,compress",
        Connection: "keep-alive",
        "User-Agent":
          "https://rayobyte.com/blog/most-common-user-agents/#:~:text=Mozilla/5.0%20(Windows%20NT%206.1%3B%20WOW64%3B%20rv%3A12.0)%20Gecko/20100101%20Firefox/12.0",
      },
    });

    const html = req.data.replaceAll("\n", "");
    const dom = new JSDOM(html);

    const dollar = dom.window.document
      .querySelector("#dolar .field-content .recuadrotsmc .centrado > strong")
      .textContent.match(/(\d+)(?:\,(\d{1,2}))?/)[0]
      .replace(",", ".");
    const date = dom.window.document.querySelector(
      ".date-display-single"
    ).textContent;

    return { dollar, date, url };

  } catch (e) {
    console.error(e.message);
    throw new Error(e.message);
  }
}

module.exports = getPrices;

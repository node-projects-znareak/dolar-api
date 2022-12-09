const axios = require("axios").default;
const { JSDOM } = require("jsdom");

async function getPrices() {
  const url = "https://monitordolarvenezuela.com/";
  try {
    const htmltext = await axios.get(url, {
      responseType: "text",
      headers: { "Accept-Encoding": "gzip,deflate,compress" }
    });
    const dom = new JSDOM(htmltext.data.replaceAll("\n", ""));

    const findContent = (path, prop = "textContent") => {
      const data = dom.window.document.querySelector("#promedios .row div:nth-of-type(2) > div > " + path)[prop]
      return data;
    }

    const dollar = findContent("p").match(/(\d+)(?:\,(\d{1,2}))?/)[0].replace(",", ".")
    const date = findContent("small:nth-of-type(2)", "innerHTML").replace("<br>", "  ")

    console.log({ dollar })
    return { dollar, date, url }
  } catch (e) {
    console.error(e.message);
    throw new Error(e.message);
  }
}

module.exports = getPrices;

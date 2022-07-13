const axios = require("axios").default;
const { JSDOM } = require("jsdom");

async function getPrices() {
  const url = "http://www.bcv.org.ve/";
  try {
    const htmltext = await axios.get(url);
    const dom = new JSDOM(htmltext.data);
    const find = (id) => {
      const data = dom.window.document.querySelector(`#${id} .centrado strong`);
      const value = data.innerHTML.replace(",", ".");
      return Number(value).toFixed(2);
    };
    const dollar = find("dolar");
    const euro = find("euro");
    const date = dom.window.document.querySelector(".dinpro span").innerHTML;
    return {
      origin: "http://www.bcv.org.ve/",
      date,
      dollar,
      euro,
    };
  } catch (e) {
    console.error(e.message);
    throw new Error(e.message);
  }
}

module.exports = getPrices;

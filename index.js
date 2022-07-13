const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const getPrices = require("./helpers/http");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(
  cors({
    methods: ["GET"],
    origin: "*",
  })
);

app.use(morgan("dev"));

app.get("/", async (_, res) => {
  try {
    const prices = await getPrices();
    res.json({
      ok: true,
      data: prices,
    });
  } catch (e) {
    res.json({
      ok: false,
      error: e.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server listen on port: ${PORT}`);
});

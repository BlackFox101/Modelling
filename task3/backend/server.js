const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const port = 3001;
const routes = require("./routes");
require('dotenv').config();

const MONGO_DB_URL = process.env.MONGO_DB_URL;

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_DB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(routes);

  app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
  });
}

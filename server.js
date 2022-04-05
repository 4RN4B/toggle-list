const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./routes/routers");

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use("/", router);

app.listen(3001, () => console.log("Listening to server at 3000"));
